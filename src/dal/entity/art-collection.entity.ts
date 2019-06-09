import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  containsArtCollections: boolean;
}
