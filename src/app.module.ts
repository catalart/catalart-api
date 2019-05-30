import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworkController } from './api/artwork.controller';
import { ArtworkService } from './business/services/artwork.service';
import { Artwork } from './dal/entity/artwork.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Artwork])],
  controllers: [ArtworkController],
  providers: [ArtworkService],
})
export class AppModule {}
