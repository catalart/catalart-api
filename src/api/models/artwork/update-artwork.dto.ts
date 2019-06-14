import { ArtistDto } from '../artist/artist.dto';

export class UpdateArtworkDto {
  readonly id: number;
  readonly classificationTerm: string;
  readonly title: string;
  readonly creator: ArtistDto;
  readonly creationDate: string;
  readonly dimensions: string;
  readonly materialsAndTechniquesDescription: string;
  readonly generalSubjectTerms: string[];
  readonly currentLocation: string;
  readonly preview: string; // url
  readonly citation: string;
}
