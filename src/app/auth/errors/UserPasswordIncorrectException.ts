import { StatusCodes } from 'http-status-codes';
import {BaseUserException} from './BaseUserException.ts';

export class UserPasswordIncorrectException extends BaseUserException {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect user name or password');
  }
}
