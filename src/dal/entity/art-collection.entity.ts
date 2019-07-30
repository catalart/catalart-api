import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(type => Artwork, artwork => artwork.artCollection)
  artwork: Promise<Artwork[]>;
}
