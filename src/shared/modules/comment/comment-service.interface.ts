import {CreateCommentDto} from './dto/create-comment.dto';
import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity';

export interface CommentService {
  create(offerId: string, dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offerId: string): Promise<number | null>;
}
