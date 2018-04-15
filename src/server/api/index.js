import { Router } from 'express';
import serviceRoutes from './service/routes';
import connectionsRoutes from './connections/routes';
import usersRoutes from './users/routes';
import postsRoutes from './posts/routes';
import adminRoutes from './admin/routes';
import listEndpoints from 'express-list-endpoints';
import authenticate from '~/middleware/authenticate';
import { handleServerErrors } from 'express-server-error';

const router = Router();

router.use('/', handleServerErrors());
router.use('/service', serviceRoutes);
router.use('/connections', connectionsRoutes);
router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/admin', authenticate(), adminRoutes);

router.get('/', (req, res) => {
  res.json(listEndpoints(router));
});

export default router;
