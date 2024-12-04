import productsCollection from "../models/productSchema.js";
const getAllProductsStatic=async (req,res)=>{
    const productsArray=await productsCollection.find();
    res.status(200).json({products:productsArray});
};

const getAllProductsDynamically=async (req,res)=>{
    const {query}=req;
    const {featured,company,name}=query;
    console.log(featured);
    console.log(typeof featured);//string
    const queryObject={}
    if(featured)//if("stringValue")-->true 
    {
        queryObject.featured=featured==="true"?true:false;
    }
    if(company)
    {
        queryObject.company=company;
    }
    console.log(queryObject);
    const productsArray=await productsCollection.find(queryObject,null,{strict:false});
    //we have to set this strict value to fasle to check if the given field is present 
    //or not if not return back the empty array or else by default it will ignore the 
    //field which is not present and will return back  the full array
    res.status(200).json({products:productsArray});
};


export {getAllProductsDynamically,getAllProductsStatic};