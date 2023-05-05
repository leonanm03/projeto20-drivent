import { createFakeEnrollment } from '../factories';
import { notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';
import { ticketsService } from '@/services';

describe('ticketsService', () => {
  describe('getTypes', () => {
    it('should throw not found error if there is no types ', () => {
      jest.spyOn(ticketsRepository, 'findMany').mockResolvedValueOnce(undefined);

      const response = ticketsService.getTypes();

      expect(response).rejects.toStrictEqual(notFoundError());
    });
  });

  describe('getTickets', () => {
    it('should throw not found error if there is no tickets ', () => {
      const enrollment = createFakeEnrollment();

      jest.spyOn(enrollmentRepository, 'findenrollmentByUserId').mockResolvedValueOnce(undefined);
      jest.spyOn(ticketsRepository, 'findTickets').mockResolvedValueOnce(undefined);

      const response = ticketsService.getTickets(enrollment.userId);

      expect(response).rejects.toStrictEqual(notFoundError());
    });
  });
});
