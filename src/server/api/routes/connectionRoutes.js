import { Router } from 'express';
import authController from '../controllers/authController';
import connectionsController from '../controllers/connectionsController';
import { twitter } from '../service/twitter';
import { catchErrors } from '../../handlers/errorHandlers';

const router = Router();

router.get('/', authController.isLoggedIn, connectionsController.get);

// Twitter
router.get('/twitter', authController.isLoggedIn, twitter.get);
router.get('/twitter/callback', authController.isLoggedIn, twitter.callback);

// Facebook

// Instagram

export default router;
