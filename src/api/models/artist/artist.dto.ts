import { Artist } from 'src/dal/entity/artist.entity';

export class ArtistDto {
  readonly id: number;
  readonly name: string;
  readonly role: string;

  static from(artist: Artist): ArtistDto {
    return {
      id: artist.id,
      name: artist.name,
      role: artist.role
    };
  }

  static to(artist: ArtistDto): Artist {
    return {
      id: artist.id,
      name: artist.name,
      role: artist.role,
      artwork: null
    };
  }
}
