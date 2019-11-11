import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Artwork } from './artwork.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

  @ManyToMany(type => Artwork, artwork => artwork.generalSubjectTerms, {
    cascade: ['insert']
  })
  @JoinTable()
  artwork: Promise<Artwork[]>;
}
