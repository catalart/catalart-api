import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ArtworkGenre } from '@dal/entity/reference/artwork-genre.entity';
import { ApiQuery } from '@api/queries/api.query';
import { ArtworkGenreRepository } from '@dal/repositories/artwork-genre.repository';
import { ReferenceMappingService } from '../maps/reference-mapping.service';
import { ReferenceService } from './reference.service';
import { ReferenceEntity } from '@dal/entity/reference/reference-entity.interface';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ListResponse } from '@business/models/list-response.model';

@Injectable()
export class ArtworkGenreReferenceService implements ReferenceService<ArtworkGenre> {
  constructor(
    @InjectRepository(ArtworkGenre)
    private readonly genreRepository: ArtworkGenreRepository,
    private readonly referenceMappingService: ReferenceMappingService
  ) {}

  async getAllAsOptions(query: ApiQuery<ArtworkGenre>): Promise<Option[]> {
    const allTerms = await this.genreRepository.search(query);
    const mappedTerms = this.referenceMappingService.mapToOptions(allTerms);
    return Promise.resolve(mappedTerms);
  }

  async getAllAsItems(query: ApiQuery<ArtworkGenre>): Promise<ListResponse<ReferenceEntity>> {
    return this.genreRepository.search(query).then(results => Promise.resolve(new ListResponse<ReferenceEntity>(results, results.length)));
  }

  getItem(itemId: number): Promise<ArtworkGenre> {
    return this.genreRepository.findOneOrFail(itemId);
  }

  addItem(item: ReferenceEntity): Promise<ArtworkGenre> {
    const newItem = new ArtworkGenre();
    newItem.description = item.description;
    newItem.label = item.label;
    newItem.name = item.name;
    return this.genreRepository.save(newItem);
  }

  updateItem(itemId: number, item: ReferenceEntity): Promise<UpdateResult> {
    return this.genreRepository.update({ id: itemId }, item);
  }

  deleteItem(itemId: number): Promise<DeleteResult> {
    return this.genreRepository.delete({ id: itemId });
  }
}
