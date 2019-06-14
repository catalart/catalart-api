import { Artwork } from 'src/dal/entity/artwork.entity';

export class ListArtworkDto {
  readonly id: number;
  readonly title: string;
  readonly creatorIdentity: string;
  readonly creationDate: string;
  readonly preview: string;

  static async from(artwork: Artwork): Promise<ListArtworkDto> {
    return {
      id: artwork.id,
      title: artwork.title,
      preview: artwork.preview,
      creatorIdentity: (await artwork.creator).name,
      creationDate: artwork.creationDate,
    };
  }
}
