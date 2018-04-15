import { Router } from 'express'
import authenticate from '~/middleware/authenticate'
import { twitter } from './twitter'

const router = Router()

// Twitter
router.get('/twitter', authenticate(), twitter.get)
router.get('/twitter/callback', authenticate(), twitter.callback)

// Facebook

// Instagram

export default router
