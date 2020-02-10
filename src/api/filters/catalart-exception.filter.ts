import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatalartException } from '@business/models/exceptions/catalart.exception';

@Catch()
export class CatalartExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let detailedError = 'An unknown exception exception has occured. Please try again later.';

    if (exception instanceof CatalartException) {
      detailedError = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      error: detailedError,
      stacktrace: exception.stack,
      success: false,
      path: request.url
    });
  }
}
