import {createServer} from "node:http";
import fs from "node:fs";
/*
    to send the html page :
    use res.setHeader("Content-Type","text/html");
    res.writeHead(200,{"Content-type":"text/html"});

    now to send a file from server we have to use the fs module in order to readfile
    or 
*/
const server=createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html"});
    fs.readFile("./index.html","utf-8",(err,data)=>{
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

server.listen("80","0.0.0.0",()=>{
    console.log("Server is up and running");
})