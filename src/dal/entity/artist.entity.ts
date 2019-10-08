import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { Artwork } from './artwork.entity';
import { Queryable } from '@dal/decorators/queryable.decorator';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Queryable
  @Index()
  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  preview: string;

  @OneToMany(type => Artwork, artwork => artwork.creator)
  artwork: Promise<Artwork[]>;
}
