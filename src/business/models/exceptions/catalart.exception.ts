import { HttpStatus, HttpException } from '@nestjs/common';

export class CatalartException extends HttpException {
  constructor(error: string) {
    super(error, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
