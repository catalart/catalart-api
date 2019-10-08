import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, Index } from 'typeorm';
import { Tag } from './tag.entity';
import { Artist } from './artist.entity';
import { ArtCollection } from './art-collection.entity';
import { Queryable } from '@dal/decorators/queryable.decorator';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Queryable
  @Index()
  @Column()
  title: string;

  @Column()
  classificationTerm: string;

  @Column()
  dimensions: string;

  @Column()
  materialsAndTechniquesDescription: string;

  @ManyToMany(type => Tag, tag => tag.artwork, { cascade: true })
  generalSubjectTerms: Promise<Tag[]>;

  @ManyToOne(type => Artist, artist => artist.artwork)
  creator: Promise<Artist>;

  @Column()
  creationDate: string;

  @Column()
  currentLocation: string;

  @Column()
  preview: string;

  @Column()
  citation: string;

  @ManyToMany(type => ArtCollection, artCollection => artCollection.artwork, { cascade: true })
  artCollection: Promise<ArtCollection[]>;
}
