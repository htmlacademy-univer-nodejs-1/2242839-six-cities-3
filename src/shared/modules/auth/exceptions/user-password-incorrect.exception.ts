import {BaseUserException} from './base-user.exception';
import {StatusCodes} from 'http-status-codes';

export class UserPasswordIncorrectException extends BaseUserException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect data login!');
  }
}
