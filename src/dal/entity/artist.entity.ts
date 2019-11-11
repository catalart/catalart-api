import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index, ManyToMany } from 'typeorm';
import { Artwork } from './artwork.entity';
import { Queryable } from '@dal/decorators/queryable.decorator';
import { ArtMovement } from './reference/art-movement.entity';
import { ArtInstitution } from './reference/art-institution.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Queryable
  @Index()
  @Column()
  name: string;

  @Column({ default: '' })
  @Index()
  role: string = '';

  @Column({ nullable: true })
  preview: string = '';

  @Column({ default: false })
  isBirthDateKnown: boolean = false;

  @Column({ nullable: true })
  isBirthDateWithinARange: boolean;

  @Column({ nullable: true })
  earliestKnownBirthDateYear: number;

  @Column({ nullable: true })
  latestKnownBirthDateYear: number;

  @Column({ nullable: true })
  exactBirthDateYear: number;

  @Column({ default: false })
  isBirthPlaceKnown: boolean = false;

  @Column({ nullable: true })
  birthPlaceLocation: string;

  @Column({ default: false })
  isDeathDateKnown: boolean = false;

  @Column({ nullable: true })
  isDeathDateWithinARange: boolean;

  @Column({ nullable: true })
  earliestKnownDeathDateYear: number;

  @Column({ nullable: true })
  latestKnownDeathDateYear: number;

  @Column({ nullable: true })
  exactDeathDateYear: number;

  @Column({ default: false })
  isDeathPlaceKnown: boolean = false;

  @Column({ nullable: true })
  deathPlaceLocation: string;

  @Column({ default: '' })
  @Index()
  nationality: string = '';

  @OneToMany(type => Artwork, artwork => artwork.creator)
  artwork: Promise<Artwork[]>;

  @ManyToMany(type => ArtMovement, artMovement => artMovement.artists)
  artMovements: Promise<ArtMovement[]>;

  @ManyToMany(type => ArtInstitution, artInstitutions => artInstitutions.artists)
  artInstitutions: Promise<ArtInstitution[]>;
}
