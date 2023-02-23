import { Router } from 'express'
import authController from '../controllers/auth.controller'

const router: Router = Router()

//routes
router.post('/login', authController.login)

export default router