import { Router } from 'express';
import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { postBooking, getBooking, updateBooking } from '@/controllers';
import { BookingIdSchema, RoomIdSchema } from '@/schemas';

const bookingsRouter = Router();

bookingsRouter
  .all('*', authenticateToken)
  .post('/', validateBody(RoomIdSchema), postBooking)
  .get('/', getBooking)
  .put('/:bookingId', validateParams(BookingIdSchema), validateBody(RoomIdSchema), updateBooking);

export { bookingsRouter };
