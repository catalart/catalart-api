import { Option } from '../option.model';

export class GetArtCollectionDto {
  id: number;
  name: string;
  type: string;
  description: string;
  location: string;
  artwork: Option[];
}
