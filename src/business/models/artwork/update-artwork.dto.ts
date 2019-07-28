import { ArtistDto } from '../artist/artist.dto';
import { CreationDateDto } from '../creation-date.dto';

export class UpdateArtworkDto {
  readonly id: number;
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
}
