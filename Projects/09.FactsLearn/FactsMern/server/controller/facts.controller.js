import Facts from "../models/FactModel.js";
import mongoose from "mongoose";


export const getFacts=async(req,res)=>{
    try{
        const facts=await Facts.find();
        if(facts.length===0){
            return res.status(200).json({message:"No facts found"});
        }
        res.status(200).json(facts);
    }catch(error){
        console.log(error);
        console.log(error.message);
        console.log("Sorry Could not fetch facts");
        res.status(404).json({message:error.message});
    }
};

export const createFact=async(req,res)=>{
    const {body:{fact,source,category,votesIntresting,votesMindBlowing,votesFalse}}=req;
    const factObject={fact,source,category,votesIntresting,votesMindBlowing,votesFalse};
    const newFact=new Facts(factObject);
    try{
        const response=await Facts.create(newFact);
        console.log(response);
        res.status(201).json(newFact);
    }catch(error){
        console.log(error);
        res.status(409).json({message:error.message});
    }
};


export const getFactByCategory=async(req,res)=>{
    try{
        const {cat}=req.params;
        const facts=await Facts.find({category:cat});
        if(facts.length===0){
            return res.status(200).json({message:"No facts found"});
        }
        res.status(200).json(facts);
    }catch(error){
        console.log(error);
        res.status(404).json({message:error.message});
    }
};


export const updateFact=async(req,res)=>{
    try{
        const {voteType}=req.body;
        const {id}=req.params;
        const update=await Facts.findByIdAndUpdate(id,{$inc:{[voteType]:1}},{new:true});
        console.log(update);
        res.json({updateRecord:update});
    }
    catch(error){
        console.log(error);
    }
}