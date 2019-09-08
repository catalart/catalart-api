import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ArtworkController } from './api/artwork.controller';
import { ArtCollectionController } from './api/art-collection.controller';
import { AuthController } from './api/auth.controller';
import { ArtistController } from './api/artist.controller';

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

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Artwork, User, ArtCollection, Artist, Tag]),
    PassportModule.register({ defaultStrategy: 'bearer' })
  ],
  controllers: [ArtworkController, ArtCollectionController, AuthController, ArtistController],
  providers: [
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
    ArtCollectionMappingService
  ]
})
export class AppModule {}
