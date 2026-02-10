import express from 'express';
import userController from '../controllers/user.controller.js';
import { validateUser } from '../middleware/validate.js';

const router = express.Router();

// POST /api/users - Create a new user
router.post('/', validateUser, userController.createUser);

// GET /api/users - Get all users
router.get('/', userController.getUsers);

export default router;