import productsCollection from "../models/productSchema.js";
const getAllProductsStatic=async (req,res)=>{
    const productsArray=await productsCollection.find();
    res.status(200).json({products:productsArray});
};

const getAllProductsDynamically=async (req,res)=>{
    const {query}=req;
    const {featured,company,name,sort,fields,numericFilters}=query;
    console.log(featured);
    // console.log(sort.split(","));
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
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };//i means insensitive to 
        //character casing that's does not matter capital or samll
    }

    if(numericFilters)//numericFiletes will be string type
    {
        const operatorMap={
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(//replace the > with $gt 
          regEx,
          (match) => `-${operatorMap[match]}-`
        );
        console.log(numericFilters);
        console.log(filters);
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {//filters:price-$gt-30
            //field:price operator:$gt and value:30
          const [field, operator, value] = item.split('-');
          if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
          }
        });
    }
    
    // console.log(queryObject);
    // let productsArray=await productsCollection.find(queryObject,null,{strict:false});
    // in the above as soon as we type await before the query it finishes for the query to 
    //give back the result but in below one it returns the query promise that is the 
    //actual query in from of promise which need's to be resolved either with .then()
    //or await
    let productsArray_Query=productsCollection.find(queryObject,null,{strict:false});
    //we have to set this strict value to fasle to check if the given field is present 
    //or not if not return back the empty array or else by default it will ignore the 
    //field which is not present and will return back  the full array

    
    console.log(queryObject);
    if(sort)
    {
      let sortResult_array=sort.split(",");
      let sortQuery={};
      sortResult_array.forEach((element) => {
        if(element[0]==="-")
        {
            const withoutSign=element.slice(1,element.length);
            sortQuery[withoutSign]=-1;
        }
        else{
            sortQuery[element]=1;
        }
        
      });
      console.log(sortQuery);
      productsArray_Query=productsArray_Query.sort(sortQuery);  
      
    }
    if(fields)
    {
        const fieldsList = fields.split(',').join(' ');
        productsArray_Query = productsArray_Query.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;//this page variable will help in skip()
    const limit = Number(req.query.limit) || 10;//limit of item to show
    const skip = (page - 1) * limit;//if page=1 and limit =10 skip=1-1*10 that i 0
    //if page=2 and limit=10 skip=2-1*10 that 10 which means skip 10 element and show after 
    //that 
    console.log(skip);
  
    productsArray_Query = productsArray_Query.skip(skip).limit(limit);
    //page=1 skip 0 product and show first 10 product where 10 is the limit
    //page=2 skip=10 that is skip first 10 and show second iteration of 10 products this 
    //is called pagination
    const productsArray=await productsArray_Query;
    res.status(200).json({products:productsArray});
};


export {getAllProductsDynamically,getAllProductsStatic};