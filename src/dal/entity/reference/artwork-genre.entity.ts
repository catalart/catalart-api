import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { Queryable } from '@dal/decorators/queryable.decorator';
import { Artwork } from '../artwork.entity';
import { ReferenceEntity } from './reference-entity.interface';

@Entity()
export class ArtworkGenre implements ReferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Queryable
  @Index()
  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  description: string;

  @OneToMany(type => Artwork, artwork => artwork.genre)
  artwork: Promise<Artwork[]>;
}
