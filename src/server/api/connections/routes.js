import { Router } from 'express';
import authenticate from '~/middleware/authenticate';
import { index, connectionid, email } from './controllers';

const router = Router();

router.get('/', authenticate(), index.get);
router.post('/', index.post);

router
  .route('/:connectionid')
  .all(authenticate())
  .get(connectionid.get)
  .post(connectionid.post)
  .delete(connectionid.delete);

router
  .route('/by/:email')
  .all(authenticate())
  .get(email.get);

export default router;
