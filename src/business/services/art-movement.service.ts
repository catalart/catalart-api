import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Option } from '@business/models/option.model';
import { ArtMovementRepository } from '@dal/repositories/art-movement.repository';
import { ArtMovement } from '@dal/entity/reference/art-movement.entity';

@Injectable()
export class ArtMovementService {
  constructor(
    @InjectRepository(ArtMovement)
    private readonly artMovementRepository: ArtMovementRepository
  ) {}

  findArtMovementsByIds(movements: Option[]): Promise<ArtMovement[]> {
    return this.artMovementRepository.findByIds(movements.map(i => i.id));
  }
}
