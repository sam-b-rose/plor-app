import { Router } from 'express'
import authenticate from '~/middleware/authenticate'
import { index, connectionid, username } from './controllers'

const router = Router()

router.get('/', authenticate(), index.get)
router.post('/', index.post)

router.route('/:connectionid')
  .all(authenticate())
  .get(connectionid.get)
  .post(connectionid.post)
  .delete(connectionid.delete)

router.route('/by/:username')
  .all(authenticate())
  .get(username.get)

export default router
