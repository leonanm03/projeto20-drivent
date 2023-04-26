import supertest from 'supertest';
import httpStatus from 'http-status';
import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import { cleanDb, generateValidToken } from '../helpers';
import {
  createBooking,
  createEnrollmentWithAddress,
  createHotel,
  createHotelTicketType,
  createRoom,
  createRoomWithLimit,
  createTicket,
  createUser,
} from '../factories';
import invalidTokenVerification from './token-verification';
import enrollmentAndTicketValidation from './enrollment-ticket-validation';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /booking', () => {
  invalidTokenVerification('/booking', 'post');
  describe('when token is valid', () => {
    it('should respond with status 400 if no body is given', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post(`/booking`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if wrong body is given', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post(`/booking`).send({ id: 1 }).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 if wrong roomId type is given in body', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server
        .post(`/booking`)
        .send({ roomId: faker.lorem.word() })
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    enrollmentAndTicketValidation('/booking', 'post', { roomId: 1 });

    it('should respond with status 403 if room is capacity is full', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createHotelTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const hotel = await createHotel();
      const room = await createRoomWithLimit(hotel.id, 1);
      await createBooking(user.id, room.id);

      const response = await server.post(`/booking`).send({ roomId: room.id }).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.FORBIDDEN);
    });

    it('should respond with status 200 and bookingId when right body is given', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createHotelTicketType();
      await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const hotel = await createHotel();
      const room = await createRoom(hotel.id);

      const response = await server.post(`/booking`).send({ roomId: room.id }).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({ bookingId: expect.any(Number) });
    });
  });
});
