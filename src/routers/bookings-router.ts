import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { postBooking } from '@/controllers';
import { RoomIdSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter.all('*', authenticateToken).post('/', validateBody(RoomIdSchema), postBooking);

export { bookingsRouter };
