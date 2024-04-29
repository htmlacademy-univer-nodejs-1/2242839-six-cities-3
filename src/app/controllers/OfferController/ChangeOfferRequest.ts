import {Request} from 'express';
import IOffer from '../../models/IOffer.ts';


export type ChangeOfferRequest = Request<Record<string, unknown>, Record<string, unknown>, IOffer & {id: string}>;
