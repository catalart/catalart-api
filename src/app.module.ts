import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ArtworkController } from './api/artwork.controller';

import { ArtworkService } from './business/services/artwork.service';
import { AuthService } from './business/services/auth.service';
import { HttpStrategy } from './business/services/http.strategy';
import { UserService } from './business/services/user.service';

import { Artwork } from './dal/entity/artwork.entity';
import { User } from './dal/entity/user.entity';
import { ArtCollection } from './dal/entity/art-collection.entity';
import { Artist } from './dal/entity/artist.entity';
import { Tag } from './dal/entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Artwork, User, ArtCollection, Artist, Tag]),
    PassportModule.register({ defaultStrategy: 'bearer' })
  ],
  controllers: [ArtworkController],
  providers: [ArtworkService, AuthService, HttpStrategy, UserService]
})
export class AppModule {}
