import { Router } from 'express'
import authenticate from '~/middleware/authenticate'
import { index, email, signIn, signOut, check } from './controllers'

const router = Router()

router.get('/', authenticate(), index.get)
router.post('/', index.post)

router.get('/check', check.get)

router.post('/sign-in', signIn.post)
router.post('/sign-out', authenticate(), signOut.post)

router.route('/:email')
  .all(authenticate())
  .get(email.get)
  .post(email.post)
  .delete(email.delete)

export default router
