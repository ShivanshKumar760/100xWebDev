import fs from "node:fs";

fs.readFile("./read_example/demo.txt",(err,data)=>{
    try{
        console.log(data);//will give a buffer data 
        //change it to string using .toString
        console.log(data.toString());
    }
    catch(err)
    {
        console.log(err);
    }
})

//instead of using a .toString function we can also specify encoding that is to encode our buffer
//with readable format utf-8

fs.readFile("./read_example/demo2.txt","utf-8",(err,data)=>{
    try{
        console.log(data);
    }
    catch(err)
    {
        console.log(err);
    }
})