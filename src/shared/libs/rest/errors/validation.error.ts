import {HttpError} from './http-error.ts';
import {ValidationErrorField} from '../types/validation-error-field.type';
import {StatusCodes} from 'http-status-codes';

export class ValidationError extends HttpError {
  public details: ValidationErrorField[] = [];

  constructor(message: string, errors: ValidationErrorField[]) {
    super(StatusCodes.BAD_REQUEST, message);
    this.details = errors;
  }
}
