import { Router } from 'express';
import listEndpoints from 'express-list-endpoints';
import connectionRoutes from './connectionRoutes';
import postRoutes from './postRoutes';
import userRoutes from './userRoutes';
import { catchErrors } from '../../handlers/errorHandlers';
import { handleServerErrors } from 'express-server-error';

const router = Router();

router.use('/', handleServerErrors());
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/connections', connectionRoutes);

router.get('/', (req, res) => {
  res.json(listEndpoints(router));
});

export default router;
