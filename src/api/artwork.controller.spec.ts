import { Test, TestingModule } from '@nestjs/testing';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from '../business/services/artwork.service';

describe('ArtworkController', () => {
  let artworkController: ArtworkController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ArtworkController],
      providers: [ArtworkService],
    }).compile();

    artworkController = app.get<ArtworkController>(ArtworkController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // TODO
    });
  });
});
