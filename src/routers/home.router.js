import { Router } from 'express';
import { homeRouteController } from '../controllers/home.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(homeRouteController));

export default router;
