import mongoose from "mongoose";

const FactCollectionSchema=new mongoose.Schema({
    fact:{
        type:String,
        required:true
    },

    source:{
        type:String,
        required:true
    },

    category:{
        type:String,
        // required:true
    },
    
    votesIntresting:{
        type:Number,
        default:0
    },

    votesMindBlowing:{
        type:Number,
        default:0
    },

    votesFalse:{
        type:Number,
        default:0
    }
},
{timestamps:{createdAt:'created_at',updatedAt:false}}
);



export default FactCollectionSchema;

