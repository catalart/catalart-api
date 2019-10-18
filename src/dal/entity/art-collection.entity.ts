import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Artwork } from './artwork.entity';
import { Queryable } from '@dal/decorators/queryable.decorator';

@Entity()
export class ArtCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @Queryable
  @Index()
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
