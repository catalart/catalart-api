import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from '../../dal/entity/artist.entity';
import { ArtistDto } from '../models/artist/artist.dto';
import { ArtistMappingService } from './maps/artist-mapping.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    private readonly artistMappingService: ArtistMappingService
  ) {}

  getOrCreateArtist(artist: ArtistDto): Promise<Artist> {
    if (!artist.id) {
      const newArtist = new Artist();
      newArtist.name = artist.identity;
      newArtist.role = artist.role;
      return this.artistRepository.save(newArtist);
    } else {
      return this.artistRepository.findOneOrFail(artist.id);
    }
  }

  getArtist(artistId: number): Promise<Artist> {
    return this.artistRepository.findOneOrFail(artistId);
  }

  async getAllArtists(): Promise<ArtistDto[]> {
    const artists = await this.artistRepository.find();
    return this.artistMappingService.mapToArtistsDto(artists);
  }
}
