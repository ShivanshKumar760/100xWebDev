import userCollection from "../models/userCollection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
function errorHandler_mongo(err)
{
    const errorsObject={email:"",password:""};
    if (err.code === 11000) {
        errorsObject.email = 'that email is already registered';
        return errorsObject;
    }
    console.log(err);
    console.log(err.errors);
    console.log(Object.values(err.errors));
    const errors=Object.values(err.errors);
    if(err.message.includes('Users validation failed'))
    {
        errors.forEach((errorObject)=>{
            console.log(errorObject.properties);
            errorsObject[errorObject.properties.path]=errorObject.properties.message;
        })
    }
    
    return errorsObject;

}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

const signup_get = (req, res) => {
    res.render('signup');
};
  
const login_get = (req, res) => {
    res.render('login');
};
  
const signup_post = async (req, res) => {
    console.log(req.body);
    const saltRounds=10;
    let {email,password}=req.body;
    console.log("Email is:",email);
    console.log(typeof password);
    if(typeof password==="number")
    {
       password=password.toString();
    }   
    console.log(typeof password);
    const hashedPassword=bcrypt.hashSync(password,saltRounds);
    console.log("Password is:",hashedPassword);
    const newUser=new userCollection({email:email,password:hashedPassword});
    userCollection.create(newUser).then((result)=>{
        console.log(result);
        // const token=createToken(result._id);
        // res.cookie("jwt",token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:result._id});
    }).catch((err)=>{
        const error_data=errorHandler_mongo(err);
        res.status(400).json({error_data});
    })
};
  
const login_post = async (req, res) => {
    console.log(req.body);
    let {email,password}=req.body;
    console.log("Email is:",email);
    if(typeof password==="number")
    {
       password=password.toString();
    }   
    userCollection.findOne({email}).then((result)=>{
        console.log(result);
        if(result)
        {
            const compareBool=bcrypt.compareSync(password,result.password);
            console.log(compareBool);
            if(compareBool){
                const token=createToken(result._id);
                res.cookie("jwt",token,{maxAge:maxAge*1000});
                return res.status(200).json({user:result._id});
            }
            else{
                throw new Error("Incorrect Password!");
            }
        
        }

        else{
            throw new Error("Email is not valid pls register first!")
        }
       
    }).catch((err)=>{//error came from then will be catched here 
        console.log(err.message);
        const error_data={}
        error_data.msg=err.message;
        res.status(400).json({error_data});
        
    })
};

export {signup_get,signup_post,login_get,login_post}
