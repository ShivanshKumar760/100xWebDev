import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie";
const AuthModal=({setShowModal,setIsSignUp,isSignUp})=>{
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [confirmPassword,setConfirmPassword]=useState(null);
    const [error,setError]=useState(null);
    const [cookies,setCookie,removeCookie]=useCookies(["user"]);
    let navigate=useNavigate();
    const handleClick=()=>{
        setShowModal(false);
    }
    //This file has a  link
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            if (isSignUp && (password !== confirmPassword)){
                    setError('Passwords need to match!')
                    return;
            }
            console.log("Make a post request to our database!");
            const response=await axios.post(`https://matchx.onrender.com/${isSignUp?'signup':'login'}`,{email:email,password:password});
            const success=response.status==201;
            setCookie("Email",response.data.email);
            setCookie("UserId",response.data.userId);
            setCookie("AuthToken",response.data.token);
            // if(success&&isSignUp)
            // {
            //     navigate("/onboarding");
            // }
            // if(success&& !isSignUp)
            // {
            //     navigate("/dashboard");
            // }
            if (success && isSignUp) navigate ('/onboarding')
            if (success && !isSignUp) navigate ('/dashboard')

            window.location.reload()
        }
         catch (error) {
            console.log(error);
        }
    }
    // const isSignUp=true;
    return(
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>❌</div>
            AUTH MODAL
            <h2>{isSignUp?"Create a Account":"Login"}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        required={true}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    {isSignUp && <input
                        type="password"
                        id="password-check"
                        name="password-check"
                        placeholder="confirm password"
                        required={true}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    <input className="secondary-button" type="submit"/>
                    <p>{error}</p>
            </form>
        </div>
    )
    
};
export default AuthModal;