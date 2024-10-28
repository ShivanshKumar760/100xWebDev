import fs from "node:fs";
console.log(fs.existsSync("./exampleDocs"));//this is a synchronous function

if(!fs.existsSync("./exampleDocs"))
{
    fs.mkdir("./exampleDocs",(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("file is created");
        }
    })
}
else{
    console.log("File already Created");
}