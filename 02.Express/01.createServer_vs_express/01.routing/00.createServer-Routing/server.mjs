import {createServer} from "node:http";

const server=createServer(function(req,res){
    const method=req.method;
    const url=req.url;
    console.log(method,url);
    //in createServer we use recursive callback and codition to do
    //routing as when ever we hit new route the recursive callback is called and method plus url is updated
    if(method==="GET" && url==="/")
    {
        res.writeHead(200,{"Content-type":"text/plain"});
        res.write("Hello");
        res.write("World");
        res.end();
    }
    else if(method==="GET" && url==="/about")
    {
        res.writeHead(200,{"Content-type":"text/plain"});
        res.write("Welcome to the about section of the website");
        res.write("This is a testing page");
        res.end();
    }

    else if(method==="GET" && url==="/contact")
    {
        res.writeHead(200,{"Content-type":"text/plain"});
        res.write("Phone Number");
        res.write("1234567890");
        res.end();
    }
    
})

server.listen(3000,"0.0.0.0",()=>{
    console.log("Server running");
})