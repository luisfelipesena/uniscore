import express from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);

router.use(authMiddleware);

export default router;
