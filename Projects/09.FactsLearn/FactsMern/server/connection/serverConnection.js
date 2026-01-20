import mongoose from "mongoose";
async function startServer(uri,expressInstance,PORT){
    try{
        await mongoose.connect(uri);
        console.log("Connected to database!..Starting Server");
        console.log("Wait for server to start it may take some time!");
        expressInstance.listen(PORT,()=>{
            console.log('Server started on port',PORT);
            console.log("Go to http://localhost:/"+PORT);
        });
    }catch(e){
        console.log(e);
    }
};


export default startServer;