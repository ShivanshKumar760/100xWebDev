import passport from "passport";
import { Strategy } from "passport-local";
import userCollection from "../collections/userCollection.js";
import bcrypt from "bcrypt";


passport.serializeUser((user,done)=>{
    console.log("Inside Serialization method");
    console.log(user);
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    //here session is modified which adds user object in 
    //request header which means user is signed in or logged in
    console.log("Inside De-serialization!");
    console.log(`Id is :${id}`);
    userCollection.findById(id).then((result)=>{
  
        if(!result){
            throw new Error("User not found wit that id!");
        }
        done(null,result);
    })
});

export default passport.use(new Strategy({usernameField:"email",passwordField:"password"},(username,password,done)=>{
    console.log("Inside!");
    userCollection.findOne({email:username}).then((result)=>{
        console.log("Inside Mongoose method")
        if(!result){
            throw new Error("User with email id not found!");
        }
        const boolVal=bcrypt.compareSync(password,result.password);
        if(!boolVal)
        {
            throw new Error("Invalid Password");
        }
        done(null,result)
    }).catch((err)=>{
        console.log("Strategy Error");
        console.log(err);
        done(err,null);
    })
}));