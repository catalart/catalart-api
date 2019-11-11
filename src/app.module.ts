import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ArtworkController } from './api/artwork.controller';
import { ArtCollectionController } from './api/art-collection.controller';
import { AuthController } from './api/auth.controller';
import { ArtistController } from './api/artist.controller';
import { ArtistReferenceController } from '@api/reference/artist-reference.controller';
import { ArtworkReferenceController } from '@api/reference/artwork-reference.controller';

import { ArtworkService } from './business/services/artwork.service';
import { AuthService } from './business/services/auth.service';
import { HttpStrategy } from './business/services/http.strategy';
import { UserService } from './business/services/user.service';
import { TagService } from './business/services/tag.service';
import { ArtistService } from './business/services/artist.service';
import { ArtCollectionService } from './business/services/art-collection.service';
import { ArtistMappingService } from './business/services/maps/artist-mapping.service';
import { ArtworkMappingService } from './business/services/maps/artwork-mapping.service';
import { TagMappingService } from './business/services/maps/tag-mapping.service';

import { Artwork } from './dal/entity/artwork.entity';
import { User } from './dal/entity/user.entity';
import { ArtCollection } from './dal/entity/art-collection.entity';
import { Artist } from './dal/entity/artist.entity';
import { Tag } from './dal/entity/tag.entity';
import { ArtCollectionMappingService } from './business/services/maps/art-collection-mapping.service';
import { ArtworkRepository } from '@dal/repositories/artwork.repository';
import { ArtistRepository } from '@dal/repositories/artist.repository';
import { ArtCollectionRepository } from '@dal/repositories/art-collection.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '@api/interceptors/transform.interceptor';
import { ReferenceMappingService } from '@business/services/maps/reference-mapping.service';
import { GenreReferenceService } from '@business/services/reference/genre-reference.service';
import { GenreRepository } from '@dal/repositories/genre.repository';
import { Genre } from '@dal/entity/reference/genre.entity';
import { GenreReferenceController } from '@api/reference/genre-reference.controller';
import { ArtInstitutionService } from '@business/services/art-institution.service';
import { ArtMovementService } from '@business/services/art-movement.service';
import { ArtInstitutionReferenceService } from '@business/services/reference/art-institution-reference.service';
import { ArtMovementReferenceService } from '@business/services/reference/art-movement-reference.service';
import { ArtInstitution } from '@dal/entity/reference/art-institution.entity';
import { ArtMovement } from '@dal/entity/reference/art-movement.entity';
import { ArtInstitutionRepository } from '@dal/repositories/art-institution.repository';
import { ArtMovementRepository } from '@dal/repositories/art-movement.repository';
import { ArtInstitutionReferenceController } from '@api/reference/art-institution-reference.controller';
import { ArtMovementReferenceController } from '@api/reference/art-movement-reference.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([
      Artwork,
      User,
      ArtCollection,
      Artist,
      Tag,
      Genre,
      ArtInstitution,
      ArtMovement,
      ArtworkRepository,
      ArtistRepository,
      ArtCollectionRepository,
      GenreRepository,
      ArtInstitutionRepository,
      ArtMovementRepository
    ]),
    PassportModule.register({ defaultStrategy: 'bearer' })
  ],
  controllers: [
    ArtworkController,
    ArtCollectionController,
    AuthController,
    ArtistController,
    ArtistReferenceController,
    ArtworkReferenceController,
    GenreReferenceController,
    ArtInstitutionReferenceController,
    ArtMovementReferenceController
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    ArtworkService,
    AuthService,
    HttpStrategy,
    UserService,
    ArtistService,
    TagService,
    ArtCollectionService,
    ArtistMappingService,
    ArtworkMappingService,
    TagMappingService,
    ArtCollectionMappingService,
    ReferenceMappingService,
    GenreReferenceService,
    ArtInstitutionService,
    ArtMovementService,
    ArtInstitutionReferenceService,
    ArtMovementReferenceService
  ]
})
export class AppModule {}
