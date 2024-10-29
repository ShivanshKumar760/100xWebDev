import {createServer} from "node:http";
/*
When you create an HTTP server using the createServer method 
in Node.js, you receive two objects as parameters: req (the request object) and 
res (the response object). These objects allow you to handle incoming requests and 
send responses back to the client.

Breakdown of req and res
Request Object (req):

Contains information about the incoming request from the client.
Key properties include:

req.url: The URL of the request.
req.method: The HTTP method (GET, POST, etc.).
req.headers: An object containing the request headers.
req.body: (available when using middleware like express.json() in Express.js) 
Contains the data sent in the request body.
*/
const server=createServer(function(req,res){
    console.log(req.url);
    console.log(req.method);
    
    console.log(req.headers); 
})

server.listen("80","0.0.0.0",()=>{
    console.log("Server is up and running");
})