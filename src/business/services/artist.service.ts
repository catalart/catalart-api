import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from '@dal/entity/artist.entity';
import { ArtistDto } from '../models/artist/artist.dto';
import { ArtistMappingService } from './maps/artist-mapping.service';
import { Option } from '@business/models/option.model';
import { ArtistQuery } from '@api/queries/artist.query';
import { ArtistRepository } from '@dal/repositories/artist.repository';
import { ListResponse } from '@business/models/list-response.model';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: ArtistRepository,
    private readonly artistMappingService: ArtistMappingService
  ) {}

  async getArtistById(artistId: number): Promise<ArtistDto> {
    const artist = await this.artistRepository.findOneOrFail(artistId);
    return this.artistMappingService.mapToArtistDto(artist);
  }

  async getAllArtists(query: ArtistQuery): Promise<ListResponse<ArtistDto>> {
    const artists = await this.artistRepository.search(query);
    const totalNumberOfArtists = await this.artistRepository.count();
    const artistList = this.artistMappingService.mapToArtistsDto(artists);
    const response = new ListResponse<ArtistDto>(artistList, totalNumberOfArtists);
    return Promise.resolve(response);
  }

  async getAllArtistsAsOptions(query: ArtistQuery): Promise<Option[]> {
    const artists = await this.artistRepository.search(query);
    return this.artistMappingService.mapToOptions(artists);
  }

  async addArtist(createdArtist: ArtistDto): Promise<Artist> {
    const artwork = this.artistMappingService.mapFromCreatedArtist(createdArtist);
    return this.artistRepository.save(artwork);
  }

  async updateArtist(updatedArtist: ArtistDto): Promise<Artist> {
    const originalArtist = await this.artistRepository.findOneOrFail(updatedArtist.id);
    const artist = this.artistMappingService.mapFromUpdatedArtist(updatedArtist, originalArtist);
    return this.artistRepository.save(artist);
  }

  async deleteArtist(artistId: number) {
    const originalArtwork = await this.artistRepository.findOneOrFail(artistId);
    return this.artistRepository.remove(originalArtwork);
  }
}
