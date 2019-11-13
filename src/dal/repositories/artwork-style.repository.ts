import { EntityRepository, FindManyOptions } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ApiQuery } from '@api/queries/api.query';
import { ReferenceQuery } from '@api/queries/reference.query';
import { ArtworkStyle } from '@dal/entity/reference/artwork-style.entity';

@EntityRepository(ArtworkStyle)
export class ArtworkStyleRepository extends BaseRepository<ArtworkStyle> {
  search(query: ApiQuery<ArtworkStyle>, options?: FindManyOptions<ArtworkStyle>): Promise<ArtworkStyle[]> {
    query = Object.assign(new ReferenceQuery<ArtworkStyle>(), query);
    return super.searchWithFilter(ArtworkStyle, query, options);
  }
}
