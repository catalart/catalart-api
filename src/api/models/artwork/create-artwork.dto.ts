import { ArtistDto } from '../artist/artist.dto';
import { Artwork } from 'src/dal/entity/artwork.entity';
import { Tag } from 'src/dal/entity/tag.entity';
import { Artist } from 'src/dal/entity/artist.entity';
import { CreationDateDto } from '../creation-date.dto';

export class CreateArtworkDto {
  readonly classificationTerm: string;
  readonly title: string;
  readonly creator: ArtistDto;
  readonly creationDate: CreationDateDto;
  readonly dimensions: string;
  readonly materialsAndTechniquesDescription: string;
  readonly generalSubjectTerms: string[];
  readonly currentLocation: string;
  readonly preview: string; // url
  readonly citation: string;

  static to(createdArtwork: CreateArtworkDto): Artwork {
    const artwork = new Artwork();

    artwork.id = 0;
    artwork.classificationTerm = createdArtwork.classificationTerm;
    artwork.title = createdArtwork.title;
    artwork.dimensions = createdArtwork.dimensions;
    artwork.materialsAndTechniquesDescription = createdArtwork.materialsAndTechniquesDescription;
    artwork.generalSubjectTerms = Promise.resolve(createdArtwork.generalSubjectTerms.map(term => Object.assign(new Tag(), { term })));
    artwork.creator = ArtistDto.to(createdArtwork.creator);
    artwork.creationDate = CreationDateDto.to(createdArtwork.creationDate);
    artwork.currentLocation = createdArtwork.currentLocation;
    artwork.preview = createdArtwork.preview;
    artwork.citation = createdArtwork.citation;

    return artwork;
  }
}
