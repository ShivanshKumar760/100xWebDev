import exprss from "express";
import { Router } from "express";

import { login, dashboard } from '../controllers/main.controller.js'

// const authMiddleware = require('../middleware/auth')

const router=Router();

// router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/dashboard').get(dashboard)
router.route('/login').post(login)

export default router;
