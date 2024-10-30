import {createServer} from "node:http";

const server=createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/plain"});
    res.write("Hello");
    res.write("World");
    res.end();
})

server.listen(3000,"0.0.0.0",()=>{
    console.log("Server running");
})