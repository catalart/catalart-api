import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../dal/entity/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  addTags(tags: string[]): Promise<Tag[]> {
    return Promise.all(
      tags.map(tag => {
        const newTag = new Tag();
        newTag.tag = tag;
        return this.tagRepository.save(newTag);
      })
    );
  }

  async updateTags(artworkId: number, tags: string[]): Promise<Tag[]> {
    const tagIds = await this.tagRepository.findByIds([artworkId]);
    await this.tagRepository.remove(tagIds);
    return Promise.all(
      tags.map(tag => {
        const newTag = new Tag();
        newTag.tag = tag;
        return this.tagRepository.save(newTag);
      })
    );
  }
}
