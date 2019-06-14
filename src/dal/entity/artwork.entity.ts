import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { Tag } from './tag.entity';
import { Artist } from './artist.entity';

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

  @ManyToMany(type => Tag, tag => tag.artwork)
  generalSubjectTerms: Promise<Tag[]>;

  @ManyToOne(type => Artist, artist => artist.artwork)
  creator: Artist;

  @Column()
  creationDate: string;

  @Column()
  currentLocation: string;

  @Column()
  preview: string;

  @Column()
  citation: string;
}
