import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Artwork } from './artwork.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @ManyToMany(type => Artwork, artwork => artwork.generalSubjectTerms)
  artwork: Promise<Artwork[]>;
}
