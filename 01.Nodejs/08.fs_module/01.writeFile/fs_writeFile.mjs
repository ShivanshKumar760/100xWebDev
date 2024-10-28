import fs from "node:fs";

fs.writeFile("./write_example/write_ex.txt","This msg is written by fs module",function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("file created or data written");
    }

}
)