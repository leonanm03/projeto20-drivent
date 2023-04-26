import Joi from 'joi';
import { RoomIdParam } from '@/services';

export const RoomIdSchema = Joi.object<RoomIdParam>({
  roomId: Joi.number().required(),
});
