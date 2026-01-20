import { useState } from "react";
import "./topbar.css";
import { Search, Chat,Brightness3TwoTone,Brightness7TwoTone} from "@material-ui/icons";
import { useEffect } from "react";

// import dotenv from "dotenv";
import logo from "../../images/logoDark.png"
import lightLogo from "../../images/logoLight.png"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Topbar() {
  // dotenv.config();
  const [theme, setTheme] = useState('light'); // Default theme
  const { user } = useContext(AuthContext);//get the user object from the authContext
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const navigate=useNavigate();
  const [searchValue,setSearchValue]=useState("")
  // console.log(import.meta.env.VITE_PUBLIC_FOLDER);

  useEffect(() => {
    // Apply theme to the document's root element
    document.body.classList.toggle('dark', theme === 'dark'); 
  }, [theme]);

  const handleTheme=()=>{
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  const { handleLogout } = useContext(AuthContext);
  const logout=()=>{
   
    handleLogout();
    navigate("/");
  }

  const handleSearchUser=async (e)=>{
    e.preventDefault();
    const response=await axios.get(`${import.meta.env.VITE_BACKEND_API}/users?username=${searchValue}`);
    // console.log(response.data);
    navigate("/searchPage",{state: { userData: response.data }});
  }
 
  return (
    <div className="topbarContainer">
      {/* left side of topbar */}
      <div className="topbarLeft">
        <Link to="/">
            <span className="logo"><img src={theme==="light"?logo:lightLogo} alt="dark-logo" /></span>
        </Link>
      </div>
      

      {/* Center of topbar */}
      <div className="topbarCenter">
        <form className="searchbar" onSubmit={handleSearchUser}>
          <input placeholder="Search for friend!Enter user id" className="searchInput"
          value={searchValue}
          onChange={(e)=>(setSearchValue(e.target.value))}
          />
          <button>
          <Search className="searchIcon" />
          </button>
        </form>
      </div>

      {/* right side of topbar */}
      <div className="topbarRight">
          <div className="topbarLinks">
            <span onClick={handleTheme} className="toggleTheme topbarLink">{theme==="light"?
              <Brightness3TwoTone className="toggleIcon"/>:<Brightness7TwoTone className="toggleIcon"/>
            }</span>
            <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
            <span className="topbarLink">Homepage</span>
            </Link>
            <Link to={`/profile/${user.username}`}style={{textDecoration:"none", color:"inherit"}} >
            <span className="topbarLink">Timeline</span>
            </Link>
          </div>
          <div className="topbarIcons">
            <Link to="/messenger">
            <div className="topbarIconItem">
              <Chat />
            </div>
            </Link>
           

            <div className="logoutBtn">
                <button onClick={logout}>Logout</button>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ?  user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
