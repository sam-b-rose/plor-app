import { Router } from 'express';
import authController from '../controllers/authController';
import postController from '../controllers/postController';
import { catchErrors } from '../../handlers/errorHandlers';

const router = Router();

router.get(
  '/',
  authController.isLoggedIn,
  catchErrors(postController.getPosts)
);
router.get(
  '/drafts',
  authController.isLoggedIn,
  catchErrors(postController.getDrafts)
);
router.get(
  '/history',
  authController.isLoggedIn,
  catchErrors(postController.getHistory)
);
router.get('/scheduled', catchErrors(postController.getScheduled));
router.get('/send', catchErrors(postController.sendPost));

router.post(
  '/',
  authController.isLoggedIn,
  catchErrors(postController.addPost)
);

router.put(
  '/',
  authController.isLoggedIn,
  catchErrors(postController.updatePost)
);

router.delete(
  '/:id',
  authController.isLoggedIn,
  catchErrors(postController.deletePost)
);

export default router;
