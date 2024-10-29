import {createServer} from "node:http";
/*
    to send the html page :
    use res.setHeader("Content-Type","text/html");
    res.writeHead(200,{"Content-type":"text/html"});
    or 
*/
const server=createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/html"});
    res.write('<h1>Hello This is home page</h1>');
    //we can use multiple res.write() in single route request
    res.write('<p>Welcome</p>');

    res.end();//to close the write buffer stream
})

server.listen("80","0.0.0.0",()=>{
    console.log("Server is up and running");
})