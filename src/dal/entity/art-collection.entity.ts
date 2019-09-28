import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Artwork } from './artwork.entity';

@Entity()
export class ArtCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @ManyToMany(type => Artwork, artwork => artwork.artCollection)
  @JoinTable()
  artwork: Promise<Artwork[]>;
}
