import supertest from 'supertest';
import httpStatus from 'http-status';
import { cleanDb } from '../helpers';
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
    enrollmentAndTicketValidation('/booking', 'post', { roomId: 1 });
  });
});
