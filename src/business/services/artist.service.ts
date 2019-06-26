import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from '../../dal/entity/artist.entity';
import { ArtistDto } from '../models/artist/artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>
  ) {}

  addArtist(artist: ArtistDto): Promise<Artist> {
    const newArtist = new Artist();
    newArtist.name = artist.identity;
    newArtist.role = artist.role;
    return this.artistRepository.save(newArtist);
  }
}
