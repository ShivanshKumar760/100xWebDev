import logoNav from "../images/logoNav.png";
import { useState,useEffect } from "react";
import {Link,useNavigate} from "react-router-dom";
import Avatar from "react-avatar";
import { MdLightMode } from "react-icons/md";
import { BsGridFill } from "react-icons/bs";
import { toggleClass,api_base_url } from '../helper.js';
function Navbar({setGrid}) {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");;

  useEffect(() => {
    fetch(api_base_url + "/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        setData(data.user);
      }
      else {
        setError(data.message);
      }
    })
  }, [])

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
    window.location.href = "/"
  }
  return (
    <>
      <div className="navbar flex items-center justify-between px-[100px] h-[103px] bg-[#141414]">
          <div className="logo">
              <Link to="/dashboard"><img className="w-[199px]  cursor-pointer" src={logoNav} alt="" /></Link>
          </div>
          <div className="links flex items-center gap-2">
            <Link>About</Link>
            <Link>Contact</Link>
            {/* <Avatar name="Shivansh Kumar" size="50" round="50%" className="cursor-pointer ml-3"/> */}
            {/* <Avatar onClick={() => { toggleClass(".dropDownNavbar", "hidden") }} name="Shivansh" size="50" round="50%" className='cursor-pointer ml-3' /> */}
            <button onClick={logout} className='btnBlue !bg-red-500 min-w-[120px] ml-2 hover:!bg-red-600'>Logout</button>
            <Avatar onClick={() => { toggleClass(".dropDownNavbar", "hidden") }} name={data ? data.name : ""} size="50" round="50%" className='cursor-pointer ml-3' />
          </div>

          <div className='dropDownNavbar hidden absolute right-[60px] top-[80px] shadow-lg shadow-black/50 p-[10px] rounded-lg bg-[#443e3e] w-[150px] h-[160px]'>
            <div className='py-[10px] border-b-[1px] border-b-[#fff]'>
              {/* <h3 className='text-[17px]' style={{ lineHeight: 1 }}>{data ? data.name : ""}</h3> */}
              <h3 className='text-[17px]' style={{ lineHeight: 1 }}>{data ? data.name : ""}</h3>
            </div>
            <i className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}><MdLightMode className='text-[20px]' /> Light mode</i>
            {/* <i onClick={() => setIsGridLayout(!isGridLayout)} className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}><BsGridFill className='text-[20px]' /> {isGridLayout ? "List" : "Grid"} layout</i> */}
            <i onClick={()=>setGrid((prevValue)=>!prevValue)} className='flex items-center gap-2 mt-3 mb-2 cursor-pointer' style={{ fontStyle: "normal" }}><BsGridFill className='text-[20px]' /> Change layout</i>
          </div>
      </div>
    </>
  )
}

export default Navbar;