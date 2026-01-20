import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from 'openai';
dotenv.config();
const app:Application=express();
const PORT: number = isNaN(Number(process.env.PORT)) ? 4000 : Number(process.env.PORT);
const API_KEY:string=process.env.OPENAI_API_KEY as string;//this is the api_key container of type string 

app.use(cors());
app.use(express.json());


const openai = new OpenAI({
    apiKey: API_KEY, // Ensure you have your API key in environment variables
});


app.post("/gen-sql",async (req:Request,res:Response)=>{
    try {
       const completions= await openai.chat.completions.create(
        {model:"gpt-4o-mini",
        store:true,
        messages:[
            {role:"user",content:`Create a SQL request to ${req.body.message}`}
        ]});

        res.send(completions.choices[0].message);

    } catch (error) {
        console.log(error);
        console.log("Could not genrate the sql querries");
        res.status(500).send("Server Error !Please try again later");
    }

})
app.listen(PORT,()=>{
    console.log("Server is running");
})