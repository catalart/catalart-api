export class UpdateArtCollectionDto {
  readonly id: number;
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly location: string;
  readonly containsArtCollections: boolean;
}