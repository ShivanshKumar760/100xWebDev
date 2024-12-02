import dotenv from "dotenv";
import productsCollection from "./models/productSchema.js";
import mongoose from "mongoose";
import { json } from "express";
import fs from "node:fs";
import { log } from "node:console";
dotenv.config();
console.log(process);
const productData=fs.readFileSync("./products.json","utf-8");
console.log(typeof productData);
const parserdProduct_Data=JSON.parse(productData);
console.log(typeof parserdProduct_Data);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected !");
}).then(()=>{
    productsCollection.deleteMany()
    .then(()=>{
        productsCollection.create(parserdProduct_Data)
        .then(()=>{
            console.log("Sucessfully created the data");
            process.exit(0);
        })
        .catch((err)=>{
            console.log("Error in data creation");
            process.exit(1)
        })
    })
    .catch(err=>console.log("Error in deleting the records"));
})
.catch(err=>console.log("Error in connecting the db"));
console.log(productData);