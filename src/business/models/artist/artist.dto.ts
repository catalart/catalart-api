import { PreviewDto } from '../preview.dto';
import { Option } from '../option.model';
import { DateAndPlaceDto } from '../date-and-place.dto';

export class ArtistDto {
  id: number;
  identity: string;
  role: string;
  preview: PreviewDto;
  born: DateAndPlaceDto;
  died: DateAndPlaceDto;
  nationality: string;
  artMovements: Option[];
  artInstitutions: Option[];
}
