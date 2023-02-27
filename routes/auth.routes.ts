import { Router } from 'express'
import authController from '../controllers/auth.controller'
import authMiddleware from '../middlewares/authMiddleware'

const router: Router = Router()

//routes
router.post('/login', authController.login)
router.get('/me', authMiddleware, authController.getLoggedUser)

export default router