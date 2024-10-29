import {createServer} from "node:http";
import fs from "node:fs";
/*
    to send the html page :
    use res.setHeader("Content-Type","text/html");
    res.writeHead(200,{"Content-type":"text/html"});

    now to send a file from server we have to use the fs module in order to readfile
    or 
*/

// instead of so many fs.readFile() function call lets 
//try to make use of recurisive call back  
const server=createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html"});
//for routing we do condition check when using native http module
    let path="./view";
    switch(req.url){
        case "/":
            path+="/home.html";
            break;
        case "/about":
            path+="/about.html"
    }
    if (req.url) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile(path,"utf-8",(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.write(data);
                res.end();
            }
        });
      } 
})

server.listen("80","0.0.0.0",()=>{
    console.log("Server is up and running");
})