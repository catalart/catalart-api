import { Injectable } from '@nestjs/common';

import { Tag } from '../../../dal/entity/tag.entity';

@Injectable()
export class TagMappingService {
  mapTagsToStrings(tags: Tag[]): string[] {
    return tags.map(this.mapTagToString);
  }

  private mapTagToString(tag: Tag): string {
    return tag.tag;
  }
}
