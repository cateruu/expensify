import { CustomErrorHandler } from './custom.error';

export class NotFoundError extends CustomErrorHandler {
  constructor(message: string) {
    super(message, 404, 'NotFoundError');
  }
}
