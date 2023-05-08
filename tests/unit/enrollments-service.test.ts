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
});
