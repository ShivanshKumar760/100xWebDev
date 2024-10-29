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
//for routing we do condition check when using native http module
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile("./home.html","utf-8",(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.write(data);
                res.end();
            }
        });
      } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile("./about.html",(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.write(data);
                res.end();
            }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
      }
})

server.listen("80","0.0.0.0",()=>{
    console.log("Server is up and running");
})