import express from 'express';
import listEndpoints from 'express-list-endpoints';
import postRoutes from './postRoutes';
import userRoutes from './userRoutes';
import { catchErrors } from '../../handlers/errorHandlers';
import { handleServerErrors } from 'express-server-error';

const router = express.Router();

router.use('/', handleServerErrors());
router.use('/posts', postRoutes);
router.use('/users', userRoutes);

router.get('/', (req, res) => {
  res.json(listEndpoints(router));
});

export default router;
