const asyncWrapper=(anonymousFunction)=>{
    return async (req,res,next)=>{
        try {
            /*await async (req,res)=>{
                const taskCollection_array=await taskCollection.find();
                res.status(200).json({tasks:taskCollection_array});
            }(req,res,next) here this custome middleware will be called from a 
            express method like get post ,patch or delete it will gain req,res and next
            access iifi*/
            await anonymousFunction(req,res,next);
        } catch (error) {
            next(error);
        }
    }
}

export default asyncWrapper;