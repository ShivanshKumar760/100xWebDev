import {createServer} from "node:http";

const server=createServer(function(req,res){
    console.log("Request Is made");//this wont do anything if we make a request from 
    //browser but in our nodejs console it will log server is up and running
})

server.listen("80","0.0.0.0",()=>{
    console.log("Server is up and running");
})