import express from "express";
import { Router } from "express";
import { getAllProductsDynamically,getAllProductsStatic } from "../controllers/products.controller.js";
const productRouter=Router();

productRouter.route("/").get(getAllProductsDynamically);
productRouter.route("/static").get(getAllProductsStatic);


export default productRouter;