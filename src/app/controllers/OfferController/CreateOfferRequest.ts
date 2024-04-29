import {Request} from 'express';
import IOffer from '../../models/IOffer.ts';

export type CreateOfferRequest = Request<Record<string, unknown>, Record<string, unknown>, IOffer>;
