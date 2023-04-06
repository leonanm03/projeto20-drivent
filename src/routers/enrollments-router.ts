import { Router } from 'express';
import { authenticateToken, validateBody /*,validateQuery*/ } from '@/middlewares';
import { getEnrollmentByUser, postCreateOrUpdateEnrollment, getAddressFromCEP } from '@/controllers';
import { createOrUpdateEnrollmentSchema /*, searchEnrollmentSchema*/ } from '@/schemas';

const enrollmentsRouter = Router();

enrollmentsRouter
  .get('/cep', /*validateQuery(searchEnrollmentSchema),*/ getAddressFromCEP)
  .all('/*', authenticateToken)
  .get('/', getEnrollmentByUser)
  .post('/', validateBody(createOrUpdateEnrollmentSchema), postCreateOrUpdateEnrollment);

export { enrollmentsRouter };
