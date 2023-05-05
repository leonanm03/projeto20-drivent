import { createFakeBooking, createFakeEnrollment, createFakeRoom, createFakeTicket } from '../factories';
import { bookingRepository, enrollmentRepository, hotelsRepository, ticketsRepository } from '@/repositories';
import { bookingsService } from '@/services';

function enrollmentandTicketmock() {
  const enrollment = createFakeEnrollment();
  const ticket = createFakeTicket();

  jest.spyOn(enrollmentRepository, 'findenrollmentByUserId').mockImplementationOnce((): any => enrollment);
  jest.spyOn(ticketsRepository, 'findTickets').mockImplementationOnce((): any => ticket);
}
describe('booking-service test suite', () => {
  describe('enrollmentAndTicketCheck', () => {
    it('should throw not found error when enrollment is not found', async () => {
      const userId = 1;
      const ticket = createFakeTicket();

      jest.spyOn(enrollmentRepository, 'findenrollmentByUserId').mockResolvedValueOnce(undefined);
      jest.spyOn(ticketsRepository, 'findTickets').mockImplementationOnce((): any => ticket);

      const response = bookingsService.enrollmentAndTicketCheck(userId);

      expect(response).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });

    it('should throw not found error when ticket is not found', async () => {
      const userId = 1;
      const enrollment = createFakeEnrollment();

      jest.spyOn(enrollmentRepository, 'findenrollmentByUserId').mockImplementationOnce((): any => enrollment);
      jest.spyOn(ticketsRepository, 'findTickets').mockResolvedValueOnce(undefined);

      const response = bookingsService.enrollmentAndTicketCheck(userId);

      expect(response).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });

    it('should throw forbidden error when ticket is not paid', async () => {
      const userId = 1;
      const enrollment = createFakeEnrollment();
      const ticket = createFakeTicket({ status: 'RESERVED' });

      jest.spyOn(enrollmentRepository, 'findenrollmentByUserId').mockImplementationOnce((): any => enrollment);
      jest.spyOn(ticketsRepository, 'findTickets').mockImplementationOnce((): any => ticket);

      const response = bookingsService.enrollmentAndTicketCheck(userId);

      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'Forbidden Error',
      });
    });
    it('should throw forbidden error when ticket is remote', async () => {
      const userId = 1;
      const enrollment = createFakeEnrollment();
      const ticket = createFakeTicket({ isRemote: true });

      jest.spyOn(enrollmentRepository, 'findenrollmentByUserId').mockImplementationOnce((): any => enrollment);
      jest.spyOn(ticketsRepository, 'findTickets').mockImplementationOnce((): any => ticket);

      const response = bookingsService.enrollmentAndTicketCheck(userId);

      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'Forbidden Error',
      });
    });
    it('should throw forbidden error when hotel is not included', async () => {
      const userId = 1;
      const enrollment = createFakeEnrollment();
      const ticket = createFakeTicket({ includesHotel: false });

      jest.spyOn(enrollmentRepository, 'findenrollmentByUserId').mockImplementationOnce((): any => enrollment);
      jest.spyOn(ticketsRepository, 'findTickets').mockImplementationOnce((): any => ticket);

      const response = bookingsService.enrollmentAndTicketCheck(userId);

      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'Forbidden Error',
      });
    });
  });

  describe('postBooking', () => {
    it(' should throw not found error when room does not exist', async () => {
      const userId = 1;
      const roomId = 1;

      enrollmentandTicketmock();
      jest.spyOn(hotelsRepository, 'getRoomWithBookings').mockResolvedValueOnce(undefined);

      const response = bookingsService.postBooking(userId, roomId);

      expect(response).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });

    it(' should throw forbidden error when room is full', async () => {
      const userId = 1;
      const room = createFakeRoom({ capacity: 0 });

      enrollmentandTicketmock();
      jest.spyOn(hotelsRepository, 'getRoomWithBookings').mockImplementationOnce((): any => room);

      const response = bookingsService.postBooking(userId, room.id);

      expect(response).rejects.toEqual({
        name: 'ForbiddenError',
        message: 'Forbidden Error',
      });
    });

    it(' should return booking when valid data', async () => {
      const userId = 1;
      const roomId = 1;
      const room = createFakeRoom();
      const booking = createFakeBooking({ userId, roomId });

      enrollmentandTicketmock();
      jest.spyOn(hotelsRepository, 'getRoomWithBookings').mockImplementationOnce((): any => room);
      jest.spyOn(bookingRepository, 'postBooking').mockImplementationOnce((): any => booking);

      const response = bookingsService.postBooking(userId, room.id);

      expect(response).resolves.toEqual(booking);
    });
  });

  describe('getBooking', () => {
    it('should throw not found error when booking does not exist', async () => {
      const userId = 1;

      enrollmentandTicketmock();

      jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(undefined);

      const response = bookingsService.getBooking(userId);

      expect(response).rejects.toEqual({
        name: 'NotFoundError',
        message: 'No result for this search!',
      });
    });

    it('should return user booking', async () => {
      const userId = 1;

      enrollmentandTicketmock();
      const booking = createFakeBooking({ userId });

      jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(booking);

      const response = bookingsService.getBooking(userId);

      expect(response).resolves.toStrictEqual(booking);
    });
  });
});
