import { useState } from "react"
import logo from "../images/logo.png"
import {Link,useNavigate} from "react-router-dom"
import rightside from "../images/rightside.png"
import { api_base_url } from "../helper"

const SignUp = () => {

    const [username,setUsername]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [pwd,setPwd]=useState("");

    const [error, setError] = useState("");

    const navigate = useNavigate();
    // const submitForm=(e)=>{
    //     e.preventDefault()
    // }

    const submitForm = (e) => {
        e.preventDefault();
        fetch(api_base_url + "/signUp",{
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: username,
            name: name,
            email: email,
            password: pwd
          })
        }).then((res)=>res.json()).then((data)=>{
          if(data.success === true){
            alert("Account created successfully");
            navigate("/login"); 
          }
          else{
            setError(data.message);
          }
        })
      }
  return (
    <>
        <div 
        className="container w-screen min-h-screen flex items-center justify-between  pl-[100px]">

            <div className="left w-[40%] ">
                <img  className="w-[250px]" src={logo} alt="webweaver-logo" />
                <form  onSubmit={submitForm} className="w-full mt-10" action="">
                    <div className="inputBox">
                        <input required type="text" placeholder="Username/Userid" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>

                    <div className="inputBox">
                        <input required type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>


                    <div className="inputBox">
                        <input required type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>


                    <div className="inputBox">
                        <input required type="password" placeholder="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
                    </div>

                    <p className="text-[grey]">Already have an account: <Link to="/login" className="text-[#00AEEF]">Login</Link></p>
                    <p className='text-red-500 text-[14px] my-2'>{error}</p>
                    <button className="btnBlue w-full mt-[20px]">Sign up</button>
                </form>



            </div>
            <br/>
            <div className="right w-[55%]">
                <img  className="h-[100vh] w-[100%] object-cover rightsideBanner" src={rightside} alt="" />
            </div>

        </div>
    </>

  )
}

export default SignUp;