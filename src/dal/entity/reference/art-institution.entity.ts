import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Index } from 'typeorm';
import { Artist } from '../artist.entity';
import { ReferenceEntity } from './reference-entity.interface';
import { Queryable } from '@dal/decorators/queryable.decorator';

@Entity()
export class ArtInstitution implements ReferenceEntity {
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

  @ManyToMany(type => Artist, artist => artist.artInstitutions)
  @JoinTable()
  artists: Promise<Artist[]>;
}
