import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artwork } from './artwork.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @OneToMany(type => Artwork, artwork => artwork.creator)
  artwork: Promise<Artwork[]>;
}
