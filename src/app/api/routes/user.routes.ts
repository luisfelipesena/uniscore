import express from 'express';
import { registrarUsuario, loginUsuario, esqueciMinhaSenha } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.post('/esqueci-minha-senha', esqueciMinhaSenha);

router.use(authMiddleware);

export default router;
