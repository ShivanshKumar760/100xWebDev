import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
dotenv.config();

const app=express();
const openai=new OpenAI({apiKey:process.env.OPENAI_KEY});
const port=process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public");
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
});

const upload=multer({storage:storage}).single("file");

let filePath;
app.post("/upload",(req,res)=>{
    upload(req,res,(err)=>{
        if(err)
        {
            res.status(500).json(err);
        }
        filePath=req.file.path;
    });
});


app.post("/openai",async (req,res)=>{
    try {
        const prompt=req.body.message;
        console.log("User Prompt is:",prompt);
        const imageAsBase6=fs.readFileSync(filePath,"base64");
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages:[
                {
                 role:"user",
                 content:[
                    {type:"text",text:prompt},
                    {type:"image_url",image_url:{url:`data:image/jpeg;base64,${imageAsBase6}`}
                }
            ]
    
                }
            
            ]
        });
    
        console.log(response.choices[0].message);
        res.send(response.choices[0].message.content);
    } catch (error) {
       console.log(error); 
    }
});


app.listen(port,()=>{
    console.log(`Server is running ${port}!`);
});