import { ArtistDto } from '../artist/artist.dto';
import { CreationDateDto } from '../creation-date.dto';

export class CreateArtworkDto {
  classificationTerm: string;
  title: string;
  creator: ArtistDto;
  creationDate: CreationDateDto;
  dimensions: string;
  materialsAndTechniquesDescription: string;
  generalSubjectTerms: string[];
  currentLocation: string;
  preview: string; // url
  citation: string;
}
