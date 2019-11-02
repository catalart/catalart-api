import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from '@dal/entity/artist.entity';
import { ArtistDto } from '../models/artist/artist.dto';
import { ArtistMappingService } from './maps/artist-mapping.service';
import { Option } from '@business/models/option.model';
import { ApiQuery } from '@api/queries/api.query';
import { ArtistQuery } from '@api/queries/artist.query';
import { ArtistRepository } from '@dal/repositories/artist.repository';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: ArtistRepository,
    private readonly artistMappingService: ArtistMappingService
  ) {}

  getOrCreateArtist(artist: ArtistDto): Promise<Artist> {
    if (!artist.id) {
      const newArtist = new Artist();
      newArtist.name = artist.identity;
      newArtist.role = artist.role;
      newArtist.preview = '';
      return this.artistRepository.save(newArtist);
    } else {
      return this.artistRepository.findOneOrFail(artist.id);
    }
  }

  async getArtistById(artistId: number): Promise<ArtistDto> {
    const artist = await this.artistRepository.findOneOrFail(artistId);
    return this.artistMappingService.mapToArtistDto(artist);
  }

  async getAllArtists(query: ArtistQuery): Promise<ArtistDto[]> {
    const artists = await this.artistRepository.search(query);
    return this.artistMappingService.mapToArtistsDto(artists);
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
