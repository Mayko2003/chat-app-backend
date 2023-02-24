import { Router } from 'express'
import userController from '../controllers/user.controller'
import authMiddleware from '../middlewares/authMiddleware'
import checkStatusMiddleware from '../middlewares/checkStatusMiddleware'
const router: Router = Router()

//routes

router.get('/', authMiddleware, userController.getAllUsers)
router.get('/id/:id', authMiddleware, checkStatusMiddleware, userController.getUserById)
router.get('/username/:username', authMiddleware, checkStatusMiddleware, userController.getUserByUsername)
router.post('/create', userController.createUser)
router.put('/update/:id', authMiddleware, checkStatusMiddleware, userController.updateUser)
router.delete('/inactive/:id', authMiddleware, checkStatusMiddleware, userController.deleteUser)
router.get('/active', authMiddleware, userController.getActiveUsers)

export default router