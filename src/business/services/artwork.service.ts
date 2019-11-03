import { Injectable } from '@nestjs/common';
import { Artwork } from '../../dal/entity/artwork.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtworkDto } from '../../business/models/artwork/create-artwork.dto';
import { ListArtworkDto } from '../models/artwork/list-artwork.dto';
import { UpdateArtworkDto } from '../models/artwork/update-artwork.dto';
import { ArtworkMappingService } from './maps/artwork-mapping.service';
import { GetArtWorkDto } from '../models/artwork/get-artwork.dto';
import { ArtworkQuery } from '@api/queries/artwork.query';
import { ArtworkRepository } from '@dal/repositories/artwork.repository';
import { Option } from '@business/models/option.model';
import { ListResponse } from '@business/models/list-response.model';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: ArtworkRepository,
    private readonly artistMappingService: ArtworkMappingService
  ) {}

  async getAllArtwork(query: ArtworkQuery): Promise<ListResponse<ListArtworkDto>> {
    const artworkList = await this.artworkRepository.search(query, { relations: ['creator'] });
    const artworkTotal = await this.artworkRepository.count();
    const mappedArtwork = await this.artistMappingService.mapFromArtworkToList(artworkList);
    const response = new ListResponse<ListArtworkDto>(mappedArtwork, artworkTotal);
    return Promise.resolve(response);
  }

  async getAllArtworkAsOptions(query: ArtworkQuery): Promise<Option[]> {
    const artworkList = await this.artworkRepository.search(query);
    return this.artistMappingService.mapFromArtworkToOptions(artworkList);
  }

  async getArtworkById(id: number): Promise<GetArtWorkDto> {
    const artwork = await this.artworkRepository.findOneOrFail(id, { relations: ['creator', 'generalSubjectTerms'] });
    return this.artistMappingService.mapToGetArtwork(artwork);
  }

  async addArtwork(createdArtwork: CreateArtworkDto): Promise<Artwork> {
    const artwork = await this.artistMappingService.mapFromCreatedArtwork(createdArtwork);
    return this.artworkRepository.save(artwork);
  }

  async updateArtwork(updatedArtwork: UpdateArtworkDto): Promise<Artwork> {
    const originalArtwork = await this.artworkRepository.findOneOrFail(updatedArtwork.id);
    const artwork = await this.artistMappingService.mapFromUpdatedArtwork(updatedArtwork, originalArtwork);
    return this.artworkRepository.save(artwork);
  }

  async deleteArtwork(artworkId: number) {
    const originalArtwork = await this.artworkRepository.findOneOrFail(artworkId, { relations: ['generalSubjectTerms'] });
    return this.artworkRepository.remove(originalArtwork);
  }

  getArtworkByIds(ids: number[]): Promise<Artwork[]> {
    return this.artworkRepository.findByIds(ids);
  }
}
