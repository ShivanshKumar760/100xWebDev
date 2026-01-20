import "./navbar.css";
import yatraLogo from "../../logo/logo.png"
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar=()=>{
    const {user}=useContext(AuthContext);
   return(
    <div className="navbar">
       
        <div className="navContainer">
            <div>
                <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
                    <img src={yatraLogo} alt="yatra logo" className="logoImage"/>
                    <span className="logo">Yatra</span>
                </Link>
                    
                
                
            </div>
            
            {user ? user.username:
            <div className="navItems">
                <Link to="/register">
                    <button className="navButton">Register</button>
                </Link>
                <Link to="/login">
                    <button className="navButton">Login</button>
                </Link>
               
            </div>}
        </div>
    </div>  
    )
};
export default Navbar;