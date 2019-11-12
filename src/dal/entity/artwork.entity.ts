import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, Index, OneToMany, JoinColumn } from 'typeorm';
import { Tag } from './tag.entity';
import { Artist } from './artist.entity';
import { ArtCollection } from './art-collection.entity';
import { Queryable } from '@dal/decorators/queryable.decorator';
import { ArtworkGenre } from './reference/artwork-genre.entity';
import { ArtworkStyle } from './reference/artwork-style.entity';

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

  @ManyToOne(type => ArtworkGenre)
  @JoinColumn({ name: 'genreId', referencedColumnName: 'id' })
  genre: Promise<ArtworkGenre>;

  @Column()
  styleId: number;

  @ManyToOne(type => ArtworkStyle)
  @JoinColumn({ name: 'styleId', referencedColumnName: 'id' })
  style: Promise<ArtworkStyle>;

  @Column()
  dimensions: string;

  @Column()
  materialsAndTechniquesDescription: string;

  @ManyToMany(type => Tag, tag => tag.artwork, { cascade: ['insert', 'update', 'remove'] })
  generalSubjectTerms: Promise<Tag[]>;

  @Column()
  creatorId: number;

  @ManyToOne(type => Artist, artist => artist.artwork)
  @JoinColumn({ name: 'creatorId', referencedColumnName: 'id' })
  creator: Promise<Artist>;

  @Column({ default: false })
  isCreationDateKnown: boolean = false;

  @Column({ nullable: true })
  isCreationDateWithinARange: boolean;

  @Column({ nullable: true })
  earliestKnownCreationDateYear: number;

  @Column({ nullable: true })
  latestKnownCreationDateYear: number;

  @Column({ nullable: true })
  exactCreationDateYear: number;

  @Column({ default: false })
  isCreationPlaceKnown: boolean = false;

  @Column({ nullable: true })
  creationPlaceLocation: string;

  @Column()
  currentLocation: string;

  @Column()
  preview: string;

  @Column()
  citation: string;

  @ManyToMany(type => ArtCollection, artCollection => artCollection.artwork, { cascade: true })
  artCollection: Promise<ArtCollection[]>;
}
