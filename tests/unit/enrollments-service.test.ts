import { notFoundError } from '@/errors';
import { enrollmentsService } from '@/services';

describe('enrollmentsService', () => {
  describe('getFirstAddress', () => {
    it('should return null if firstAddress is null', () => {
      const firstAddress = null as any;

      const response = enrollmentsService.getFirstAddress(firstAddress);

      expect(response).toBeNull();
    });
  });

  describe('createOrUpdateEnrollmentWithAddress', () => {
    it('should throw invalidDataError if getAddressFromCEP throws', async () => {
      const params = {
        name: 'test',
        cpf: 'test',
        birthday: new Date(),
        phone: 'test',
        userId: 1,
        address: {
          number: 'test',
          cep: 'test',
          street: 'test',
          city: 'test',
          state: 'test',
          neighborhood: 'test',
          addressDetail: 'test',
        },
      };

      jest.spyOn(enrollmentsService, 'getAddressFromCEP').mockImplementationOnce(() => {
        throw notFoundError();
      });

      const response = await enrollmentsService.createOrUpdateEnrollmentWithAddress(params);

      expect(response).rejects.toEqual({
        name: 'InvalidDataError',
        message: 'Invalid data',
        details: ['invalid CEP'],
      });
    });
  });
});
