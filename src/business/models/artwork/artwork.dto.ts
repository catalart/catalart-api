import { ArtistDto } from '../artist/artist.dto';
import { Option } from '../option.model';
import { DateAndPlaceDto } from '../date-and-place.dto';
import { PreviewDto } from '../preview.dto';

export class ArtworkDto {
  id: number;
  title: string;
  creator: ArtistDto;
  creationDate: DateAndPlaceDto;
  dimensions: string;
  genre: Option;
  style: Option;
  materialsAndTechniquesDescription: string;
  generalSubjectTerms: string[];
  currentLocation: string;
  preview: PreviewDto;
  citation: string;
}
