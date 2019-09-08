import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Tag } from './tag.entity';
import { Artist } from './artist.entity';
import { ArtCollection } from './art-collection.entity';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(type => ArtCollection, artCollection => artCollection.artwork, { nullable: true })
  artCollection: Promise<ArtCollection>;
}
