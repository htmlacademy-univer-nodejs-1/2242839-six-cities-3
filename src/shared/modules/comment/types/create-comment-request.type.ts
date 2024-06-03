import {Request} from 'express';
import {RequestBody, RequestParams} from '../../../libs/rest';
import {CreateCommentDto} from '../dto/create-comment.dto';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CreateCommentDto>;
