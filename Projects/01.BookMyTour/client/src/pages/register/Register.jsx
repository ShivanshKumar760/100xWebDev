import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./register.css";
const Register=()=>{
    const [username,setUsername]=useState(null);
    const [email,setEmail]=useState(null);
    const [password,setPassword]=useState(null);
    const [phone,setPhone]=useState(null);
    const [city,setCity]=useState(null);
    const [country,setCountry]=useState(null);
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { username, email, password,phone,city,country};
        setTimeout(
          ()=>{fetch(`${import.meta.env.VITE_BACKEND_API}/auth/register`,{
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)})
          .then(() => {
          console.log('new user added')})
          navigate("/");},2000);}

    return(
        <>
            <div className="register">
            <form onSubmit={handleSubmit} className="rContainer">
                <label>Username</label>
                <input type="text" required value={username} onChange={(e)=>{setUsername(e.target.value)}} className="rInput"/>

                <label>Email</label>
                <input type="text" required value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="rInput"/>


                <label>Password</label>
                <input type="password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}  className="rInput"/>

                <label>Phone</label>
                <input type="number" required value={phone} onChange={(e)=>{setPhone(e.target.value)}}  className="rInput"/>

                <label>City</label>
                <input type="text" required value={city} onChange={(e)=>{setCity(e.target.value)}}  className="rInput"/>


                <label>Country</label>
                <input type="text" required value={country} onChange={(e)=>{setCountry(e.target.value)}}  className="rInput"/>

                <input type="submit" value="sumbit" className="rButton"/>
            </form>
            </div>
        </>    
    )
}

export default Register;