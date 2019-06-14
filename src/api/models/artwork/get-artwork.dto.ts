import { Artwork } from 'src/dal/entity/artwork.entity';
import { Artist } from 'src/dal/entity/artist.entity';
import { ArtistDto } from '../artist/artist.dto';

export class GetArtWorkDto {
  readonly id: number;
  readonly classificationTerm: string;
  readonly title: string;
  readonly creator: ArtistDto;
  readonly creationDate: string;
  readonly dimensions: string;
  readonly materialsAndTechniquesDescription: string;
  readonly generalSubjectTerms: string[];
  readonly currentLocation: string;
  readonly preview: string; // url
  readonly citation: string;

  static async from(artwork: Artwork): Promise<GetArtWorkDto> {
    return {
      id: artwork.id,
      classificationTerm: artwork.classificationTerm,
      title: artwork.title,
      dimensions: artwork.dimensions,
      materialsAndTechniquesDescription: artwork.materialsAndTechniquesDescription,
      generalSubjectTerms: (await artwork.generalSubjectTerms).map(term => term.tag),
      creator: ArtistDto.from(await artwork.creator),
      creationDate: artwork.creationDate,
      currentLocation: artwork.currentLocation,
      preview: artwork.preview,
      citation: artwork.citation
    };
  }
}
