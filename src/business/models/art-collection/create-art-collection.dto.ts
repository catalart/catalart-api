import { Enumeration } from '../enumeration.model';

export class CreateArtCollectionDto {
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly location: string;
  readonly artwork: Enumeration[];
}
