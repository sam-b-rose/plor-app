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

router.post(
  '/',
  authController.isLoggedIn,
  catchErrors(postController.addPost)
);

export default router;
