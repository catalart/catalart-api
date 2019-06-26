import { Injectable } from '@nestjs/common';
import { Artwork } from '../../dal/entity/artwork.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateArtworkDto } from '../../business/models/artwork/create-artwork.dto';
import { CreationDateDto } from '../../business/models/creation-date.dto';
import { TagService } from './tag.service';
import { ArtistService } from './artist.service';
import { ListArtworkDto } from '../models/artwork/list-art-collection.dto';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
    private readonly tagService: TagService,
    private readonly artistService: ArtistService
  ) {}

  async getAllArtwork(): Promise<ListArtworkDto[]> {
    const artworkList = await this.artworkRepository.find({ relations: ['creator'] });
    return Promise.all(
      artworkList.map(async (artwork: Artwork) => {
        return {
          id: artwork.id,
          title: artwork.title,
          creationDate: artwork.creationDate,
          creatorIdentity: (await artwork.creator).name,
          preview: artwork.preview
        } as ListArtworkDto;
      })
    );
  }

  async addArtwork(createdArtwork: CreateArtworkDto) {
    const artwork = new Artwork();

    artwork.classificationTerm = createdArtwork.classificationTerm;
    artwork.title = createdArtwork.title;
    artwork.dimensions = createdArtwork.dimensions;
    artwork.materialsAndTechniquesDescription = createdArtwork.materialsAndTechniquesDescription;
    artwork.generalSubjectTerms = this.tagService.addTags(createdArtwork.generalSubjectTerms);
    artwork.creator = this.artistService.addArtist(createdArtwork.creator);
    artwork.creationDate = CreationDateDto.to(createdArtwork.creationDate);
    artwork.currentLocation = createdArtwork.currentLocation;
    artwork.preview = createdArtwork.preview;
    artwork.citation = createdArtwork.citation;

    return this.artworkRepository.save(artwork);
  }

  saveArtwork(artwork: DeepPartial<Artwork>) {
    return this.artworkRepository.save(artwork);
  }
}
