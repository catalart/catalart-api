import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Artist } from '../artist.entity';
import { ReferenceEntity } from './reference-entity.interface';
import { Queryable } from '@dal/decorators/queryable.decorator';

@Entity()
export class ArtMovement implements ReferenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Queryable
  @Index()
  @Column()
  name: string;

  @Column()
  label: string;

  @Column({ length: 1000 })
  description: string;

  @ManyToMany(type => Artist, artist => artist.artMovements)
  @JoinTable()
  artists: Promise<Artist[]>;
}
