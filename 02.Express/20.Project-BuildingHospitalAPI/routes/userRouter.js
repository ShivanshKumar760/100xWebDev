import express from "express";
import { Router } from "express";
import users from "../database/db.js";

const userRouter=Router();

userRouter.get("/user/kidneyInfo",(req,res)=>{
    // const johnKidneys=users[0].Kidneys;
    // console.log(johnKidneys);
    // //lets find number of kidney
    // const totalNumberOfKidneys=johnKidneys.length;
    // //lets find total number of healthy kidney:

    // let healthyKindey=0;
    // for(let i=0;i<totalNumberOfKidneys;i++)
    // {
    //     if(johnKidneys[i].healthy/*this should be true than only if statement will get executed*/)
    //     {
    //         healthyKindey++;
    //     }
    // }
    // const unhealthyKidney=totalNumberOfKidneys-healthyKindey;
    // const kidneyDonated=users[0].KidneyBank;
    // res.json({
    //     johnKidneys,
    //     totalNumberOfKidneys,
    //     healthyKindey,
    //     unhealthyKidney,
    //     kidneyDonated
    // });

    res.json(users);
});


userRouter.post("/user/donate",(req,res)=>{
    let {body:{patient,isHealthy}}=req;
    isHealthy=Boolean(isHealthy);
    let getRecord;
    let userFound=true;
    for(let i=0;i<users.length;i++)
    {
        if(patient===users[i].Name)
        {
            getRecord=users[i];
            break;
        }
        else
        {
            userFound=false;
        }
    }
    console.log(userFound);
    console.log(Boolean(isHealthy));
    console.log(isHealthy==true);
    console.log(getRecord);
    if(userFound && isHealthy==true)
    {
        getRecord.KidneyBank.push({
            healthy:isHealthy
        });
        return res.json({
            message:"posted"
        });
    }
    else
    {
        return res.json({msg:"sorry cant post it"});
    }
    
});

userRouter.put("/user/surgery/:user",(req,res)=>{   
    const {params:{user}}=req;
    let msg;
    for(let i=0;i<users.length;i++)
    {
        if(user===users[i].Name)
        {
            for(let j=0;j<users[i].Kidneys.length;j++)
            {
                if(users[i].Kidneys[j].healthy===true)
                {
                    msg="Everything is all right!";
                    continue;
                }
                else{
                    msg="Success"
                    users[i].Kidneys[j].healthy=true;
                }
                
            }
        }
        
    }
    
    res.json({
        surgery:msg
    });
});

userRouter.delete("/user/remove/:user",(req,res)=>{
    //first we will check if there is  any unhealthy kindey or not caue if not there is no use to use delete method on  
    //healthy kindey
    let anyUnhealthy=false;
    const {params:{user}}=req;
    let getRecord
    for(let i=0;i<users.length;i++)
    {   if(user===users[i].Name)
        {
            getRecord=users[i];
            for(let j=0;i<users[i].Kidneys.length;j++)
            {
                if(users[i].Kidneys[j].healthy)
                {
                    anyUnhealthy=true;
                }
            }
        }
       
    }

    if(anyUnhealthy)
    {
        const newKidney=[];
        for(let j=0;i<getRecord.Kidneys.length;j++)
        {
            if(getRecord.Kidneys[j].healthy)
            {
                newKidney.push({
                healthy:true});
            }
        }
        getRecord.Kidneys=newKidney;
        res.json({
            message:"removed"
        });

    }
    else{
        res.sendStatus(411);
    }
});

export default userRouter;