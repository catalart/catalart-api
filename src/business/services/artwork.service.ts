import { Injectable } from '@nestjs/common';
import { Artwork } from 'src/dal/entity/artwork.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { Observable, from } from 'rxjs';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
  ) {}

  getArtworkById(id: number): Observable<Artwork> {
    return from(this.artworkRepository.findOne(id));
  }

  getAllArtwork(): Observable<Artwork[]> {
    return from(this.artworkRepository.find());
  }

  addArtwork(artwork: DeepPartial<Artwork>) {
    return this.artworkRepository.save(artwork);
  }

  saveArtwork(artwork: DeepPartial<Artwork>) {
    return this.artworkRepository.save(artwork);
  }
}
