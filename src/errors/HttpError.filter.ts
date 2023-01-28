import {
  HttpException,
  HttpStatus,
  HttpCode,
  HttpExceptionOptions,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch()
export class HttpErrorFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const next = ctx.getNext();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const err = {
      code: status,
      timestamp: Date.now().toLocaleString(),
      path: req.url,
      method: req.method,
      message:
        status !== HttpStatus.INTERNAL_SERVER_ERROR
          ? null
          : 'Internal Server Error: please try again, or contact site admin if the problem persists.',
    };

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(
        `HTTP error: ${req.method} @ ${req.url}`,
        JSON.stringify(err),
        'ExceptionFilter'
      );
    }

    res.status(status).json(err);
    next();
  }
}
