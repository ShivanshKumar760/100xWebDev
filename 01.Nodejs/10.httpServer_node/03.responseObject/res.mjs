import {createServer} from "node:http";
/*
When you create an HTTP server using the createServer method 
in Node.js, you receive two objects as parameters: req (the request object) and 
res (the response object). These objects allow you to handle incoming requests and send responses back to the client.

Breakdown of req and res
Response Object (res):

Used to formulate and send a response back to the client.

Key methods include:
res.writeHead(statusCode, headers): Sets the HTTP status code and headers for the 
response.

res.end(data): Ends the response process and optionally sends data to the client.
res.write(data): Sends a chunk of data to the client (before calling res.end()).
*/
const server=createServer(function(req,res){
    res.writeHead(200,{"Content-type":"text/plain"});
    res.write("Hello This is home page\n");
    //we can use multiple res.write() in single route request
    res.write("Welcome");

    res.end();//to close the write buffer stream
})

server.listen("80","0.0.0.0",()=>{
    console.log("Server is up and running");
})