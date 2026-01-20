import { Router } from "express";
import { getFacts,createFact,getFactByCategory,updateFact } from "../controller/facts.controller.js";
const router=Router();

router.get("/facts",getFacts);
router.post("/facts/create",createFact);
router.get("/facts/category/:cat",getFactByCategory);
router.put("/facts/update/:id",updateFact);


export default router;