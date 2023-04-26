import supertest from 'supertest';
import httpStatus from 'http-status';
import { TicketStatus } from '@prisma/client';
import { generateValidToken } from '../helpers';
import {
  createEnrollmentWithAddress,
  createNoHotelTicketType,
  createRemoteTicketType,
  createTicket,
  createTicketType,
  createUser,
} from '../factories';
import app from '@/app';

const server = supertest(app);

export default function enrollmentAndTicketValidation(
  route: string,
  verb: 'get' | 'post' | 'put' | 'delete',
  body?: { roomId: number },
) {
  it('should respond with status 404 if user dosent have enrollment yet', async () => {
    const token = await generateValidToken();

    const response = await server[verb](`${route}`).send(body).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it('should respond with status 404 if user doesnt have ticket yet', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);

    const response = await server[verb](`${route}`).send(body).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it(`should respond with status 402 if user's ticket is not paid`, async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createTicketType();
    await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

    const response = await server[verb](`${route}`).send(body).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });

  it(`should respond with status 402 if user's ticket is remote`, async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createRemoteTicketType();
    await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const response = await server[verb](`${route}`).send(body).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });
  it(`should respond with status 402 if user's ticket doesnt't includes hotel`, async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const enrollment = await createEnrollmentWithAddress(user);
    const ticketType = await createNoHotelTicketType();
    await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const response = await server[verb](`${route}`).send(body).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
  });
}
