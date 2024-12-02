import { customApiError } from "../error/errorClasss";
const errorHandler=(err,req,res,next)=>{
    console.log(err);
    if(err instanceof customApiError)
    {
        return res.status(err.statusCode).json({msg:err.message});
    }
    return res.status(500).json({msg:"Something Went Wrong sorry for the inconvinience!"});
    next();
}

export default errorHandler;