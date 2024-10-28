import fs from "node:fs";

const streamData=fs.createReadStream("./large.txt");
let data="";
streamData.on("data",function(chunk){
    console.log("----New Chunk----");
    console.log(chunk);
    data+=chunk;
    
})
console.log(data.toString());//this wont work as streamData.on is async in nature so this console.log(data.toString()) will 
//get executed first