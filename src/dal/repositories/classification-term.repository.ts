import { EntityRepository, FindManyOptions } from 'typeorm';
import { BaseRepository } from './base.repository';
import { ArtCollectionQuery } from '@api/queries/art-collection.query';
import { ClassificationTerm } from '@dal/entity/reference/classification-term.entity';
import { ApiQuery } from '@api/queries/api.query';

@EntityRepository(ClassificationTerm)
export class ClassificationTermRepository extends BaseRepository<ClassificationTerm> {
  search(query: ApiQuery<ClassificationTerm>, options?: FindManyOptions<ClassificationTerm>): Promise<ClassificationTerm[]> {
    query = Object.assign(new ArtCollectionQuery(), query);
    return super.searchWithFilter(ClassificationTerm, query, options);
  }
}
