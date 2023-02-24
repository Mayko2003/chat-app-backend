import { Router } from 'express'
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/authMiddleware'
const router: Router = Router()

//routes

router.get('/', authMiddleware, userController.getAllUsers)
router.get('/id/:id', authMiddleware, userController.getUserById)
router.get('/username/:username', authMiddleware, userController.getUserByUsername)
router.post('/create', userController.createUser)
router.put('/update/:id', authMiddleware, userController.updateUser)
router.delete('/inactive/:id', authMiddleware, userController.deleteUser)
router.get('/active', authMiddleware, userController.getActiveUsers)

export default router