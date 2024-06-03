import {BaseController, HttpMethod, ValidateDtoMiddleware} from '../../libs/rest';
import {inject, injectable} from 'inversify';
import {Component} from '../../types';
import {Logger} from '../../libs/logger';
import {CommentService} from './comment-service.interface';
import {OfferService} from '../offer';
import {CreateCommentRequest} from './types/create-comment-request.type';
import {Response} from 'express';
import {fillDTO} from '../../helpers';
import {CommentRdo} from './rdo/comment.rdo';
import {CreateCommentDto} from './dto/create-comment.dto';
import {PrivateRouteMiddleware} from '../../libs/rest/middleware/private-route.middleware';

@injectable()
export default class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/offers/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create({body, params, tokenPayload}: CreateCommentRequest, res: Response): Promise<void> {
    const offerId = params.offerId as unknown as string;
    const comment = await this.commentService.create(offerId,{...body, user: tokenPayload.id});
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
