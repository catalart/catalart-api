import { Injectable } from '@nestjs/common';
import { Artwork } from '../../dal/entity/artwork.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtworkDto } from '../../business/models/artwork/create-artwork.dto';
import { ListArtworkDto } from '../models/artwork/list-art-collection.dto';
import { UpdateArtworkDto } from '../models/artwork/update-artwork.dto';
import { ArtworkMappingService } from './maps/artwork-mapping.service';
import { GetArtWorkDto } from '../models/artwork/get-artwork.dto';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
    private readonly artistMappingService: ArtworkMappingService
  ) {}

  async getAllArtwork(): Promise<ListArtworkDto[]> {
    const artworkList = await this.artworkRepository.find({ relations: ['creator'] });
    return this.artistMappingService.mapFromArtworkToList(artworkList);
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
    const artwork = await this.artistMappingService.mapFromUpdatedArtwork(updatedArtwork);
    return this.artworkRepository.save(artwork);
  }
}
