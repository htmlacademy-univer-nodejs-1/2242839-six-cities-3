import {Request} from 'express';
import {RequestBody, RequestParams} from '../httpLogic/httpEntities.ts';
import {ILoginUser} from '../../models/IUser.ts';

export type LoginUserRequest = Request<RequestParams, RequestBody, ILoginUser>;
