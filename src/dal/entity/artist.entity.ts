import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artwork } from './artwork.entity';
import { Queryable } from '@dal/decorators/queryable.decorator';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Queryable
  name: string;

  @Column()
  role: string;

  @Column()
  preview: string;

  @OneToMany(type => Artwork, artwork => artwork.creator)
  artwork: Promise<Artwork[]>;
}
