import {createServer} from "node:http";
import fs from "node:fs";


const server=createServer(function(req,res){
    const method=req.method;
    const url=req.url;
    console.log(method,url);
    let path="./public";
    switch(url){
        case "/":
            path+="/index.html"
            break;
        case "/about":
            path+="/about.html"
            break;
    }
    //to server any html file in native node:http we need to use 
    //fs module
    res.writeHead(200,{"Content-type":"text/html"});
    fs.readFile(path,"utf-8",(err,data)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.write(data);
            res.end();
        }
    })
    
})

server.listen(3000,"0.0.0.0",()=>{
    console.log("Server running");
})