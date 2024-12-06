import dotenv from "dotenv";
dotenv.config();
const port=process.env.PORT||4000;
function startServer(mongooseInstance,ExpressInstance)
{
    mongooseInstance.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to atlas db");
     }).then(()=>{ExpressInstance.listen(port,()=>{
         console.log(`Server is running on ${port}`);
     })}).catch((error)=>{
         console.log(error);
         console.log("Sorry could not connect to the atlas-db");
     });
};

export default startServer;