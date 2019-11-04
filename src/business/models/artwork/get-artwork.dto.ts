import { ArtistDto } from '../artist/artist.dto';
import { CreationDateDto } from '../creation-date.dto';
import { Option } from '../option.model';

export class GetArtWorkDto {
  id: number;
  classificationTerm: Option;
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
