import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface';
import { Component } from '../../types';
import { CommentEntity, CommentModel } from './comment.entity';
import { DefaultCommentService } from './default-comment.service';
import {Controller} from '../../libs/rest';
import CommentController from './comment.controller';

export const commentContainer = () => {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  container.bind<Controller>(Component.CommentController)
    .to(CommentController).inSingletonScope();

  return container;
};
