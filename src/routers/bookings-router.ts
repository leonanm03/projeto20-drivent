import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { postBooking, getBooking } from '@/controllers';
import { RoomIdSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter.all('*', authenticateToken).post('/', validateBody(RoomIdSchema), postBooking).get('/', getBooking);

export { bookingsRouter };
