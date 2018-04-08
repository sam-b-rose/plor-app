import { Router } from 'express'
import authenticate from '~/middleware/authenticate'
import { index, postid, email } from './controllers'

const router = Router()

router.get('/', authenticate(), index.get)
router.post('/', index.post)

router.route('/:postid')
  .all(authenticate())
  .get(postid.get)
  .post(postid.post)
  .delete(postid.delete)

router.route('/by/:email')
  .all(authenticate())
  .get(email.get)

export default router
