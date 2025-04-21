import { Router } from "express";
import isAuthenticated from "../middleware/auth.middlware.js";
import { login, register } from "../controller/auth.controller.js";
import {
  getUserSpecificTodos,
  postTodo_userSpecific,
} from "../controller/todo.controller.js";
const router = Router();

router.post("/login", login);
router.post("/register", register);

router.get("/todos", isAuthenticated, getUserSpecificTodos);
router.post("/todos", postTodo_userSpecific);

export default router;
