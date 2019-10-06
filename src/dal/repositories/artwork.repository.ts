import { EntityRepository, Repository, FindManyOptions } from 'typeorm';
import { Artwork } from '@dal/entity/artwork.entity';
import { ArtworkQuery } from '@api/queries/artwork.query';

@EntityRepository(Artwork)
export class ArtworkRepository extends Repository<Artwork> {
  search(query: ArtworkQuery, options: FindManyOptions<Artwork>): Promise<Artwork[]> {
    query = Object.assign(new ArtworkQuery(), query);
    return super.find({
      relations: options.relations,
      take: query.limit,
      skip: query.offset,
      where: query.determineQueryFilters()
    });
  }
}
