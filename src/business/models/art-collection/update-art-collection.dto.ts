import { Enumeration } from '../enumeration.model';

export class UpdateArtCollectionDto {
  id: number;
  name: string;
  type: string;
  description: string;
  location: string;
  artwork: Enumeration[];
}
