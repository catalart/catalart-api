import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { CatalartException } from '@business/models/exceptions/catalart.exception';

@Catch(CatalartException)
export class CatalartExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      error: exception.message,
      stacktrace: exception.stack,
      success: false,
      path: request.url
    });
  }
}
