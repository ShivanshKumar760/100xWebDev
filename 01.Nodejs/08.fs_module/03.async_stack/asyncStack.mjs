import fs from "node:fs";

//read file async

fs.readFile("./example.txt",(err,data)=>{

    try{
        console.log(data);//buffer data
        console.log(data.toString());
    }
    catch(err)
    {
        console.log(err);
    }
})

console.log("Hello World this line is written after fs.readFile()");

fs.writeFile("./example.txt","this is a over written file from nodejs",function(err){
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Data is written");
    }
});