import { Router } from 'express'
import messageController from '../controllers/message.controller'
import authMiddleware from '../middlewares/authMiddleware'
import checkStatusMiddleware from '../middlewares/checkStatusMiddleware'

const router: Router = Router()

//routes
router.get('/', authMiddleware, messageController.getAllMessages)
router.get('/conversation/:username', checkStatusMiddleware, authMiddleware, messageController.getConversation)
router.post('/send/:username', authMiddleware, checkStatusMiddleware, messageController.sendMessage)

export default router