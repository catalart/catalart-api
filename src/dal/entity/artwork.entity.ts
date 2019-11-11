import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, Index, OneToMany, JoinColumn } from 'typeorm';
import { Tag } from './tag.entity';
import { Artist } from './artist.entity';
import { ArtCollection } from './art-collection.entity';
import { Queryable } from '@dal/decorators/queryable.decorator';
import { Genre } from './reference/genre.entity';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Queryable
  @Index()
  @Column()
  title: string;

  @Column()
  genreId: number;

  @ManyToOne(type => Genre)
  @JoinColumn({ name: 'genreId', referencedColumnName: 'id' })
  genre: Promise<Genre>;

  @Column()
  dimensions: string;

  @Column()
  materialsAndTechniquesDescription: string;

  @ManyToMany(type => Tag, tag => tag.artwork, { cascade: true })
  generalSubjectTerms: Promise<Tag[]>;

  @Column()
  creatorId: number;

  @ManyToOne(type => Artist, artist => artist.artwork)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
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
