import fs from "node:fs";

fs.mkdir("./makeDirectory",(err)=>{
    if(err)
    {
        console.log(err)
    }else{console.log("Folder/directory created")};
})