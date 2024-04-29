import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {BaseController} from '../baseController/BaseController.ts';
import {Component} from '../../settings/component.ts';
import AppLogger from '../../logger/Logge.tsr';
import {HttpMethod} from '../httpLogic/httpMethod.ts';
import {fillDTO} from '../../../helpers/fillDTO.ts';
import {OfferRdo} from '../rdo/OfferRdo.ts';
import {OfferService} from '../../services/OfferService.ts';
import {HttpError} from '../httpLogic/httpError.ts';
import {CreateOfferRequest} from './CreateOfferRequest.ts';
import {DeleteOfferRequest} from './DeleteOfferRequest.ts';
import {ChangeOfferRequest} from './ChangeOfferRequest.ts';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: AppLogger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.logger.info('Register routes for OfferController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/', method: HttpMethod.Put, handler: this.changeOffer });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, categories);
    this.ok(res, responseData);
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {

    const existOffer = await this.offerService.findByID(body.offerID);

    if (existOffer) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Offer with ID «${body.offerID}» exists.`,
        'OfferController'
      );
    }

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async delete({body: {id}}: DeleteOfferRequest, res: Response): Promise<void> {
    const existOffer = await this.offerService.findByID(id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer with ID «${id}» doesn\`t exists.`,
        'OfferController'
      );
    }
    const deletedOffer = await this.offerService.deleteByID(id);
    this.ok(res, fillDTO(OfferRdo, deletedOffer));
  }

  public async changeOffer({body}: ChangeOfferRequest, res: Response): Promise<void> {
    const {id, ...newOffer} = body;
    const existOffer = await this.offerService.findByID(id);

    if (!existOffer) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Offer with ID «${id}» doesn\`t exists.`,
        'OfferController'
      );
    }
    const newOfferDb = await this.offerService.changeOffer(body.id, newOffer);
    this.ok(res, fillDTO(OfferRdo, newOfferDb));
  }
}
