import { Request } from 'express';
import IUser from '../../models/IUser.ts';
import {RequestBody, RequestParams} from '../httpLogic/httpEntities.ts';

export type CreateUserRequest = Request<RequestParams, RequestBody, IUser>;
