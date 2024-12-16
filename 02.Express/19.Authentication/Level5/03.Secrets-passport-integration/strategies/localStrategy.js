import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import userCollection from "../collections/userCollections.js";
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
        console.log("Inside Strategy!");
        userCollection.findOne({email:username}).then((result)=>{
            console.log("Inside Mongoose method of Strategy")
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

