import fs from "node:fs";

fs.rmdir("./makeDirectory1",(err)=>{//this will only remove the empty directory
    if(err)
    {
        console.log(err)
    }else{console.log("Folder/directory removed")};
})