import {Link} from "react-router-dom";
const Navbar=()=>{
    return (
        <nav className="navbar">
            <h1>Blog Web-Site:</h1>
            <div className="links">
                <Link to="/" style={{
                    color:"white",
                    backgroundColor:"#f1356d",
                    borderRadius:"10px",
                    padding:"10px"
                }}>Home</Link>
                
                <Link to="/create" style={{
                    color:"white",
                    backgroundColor:"#f1356d",
                    borderRadius:"10px",
                    padding:"10px"
                }}>New Blog</Link>
            </div>
        </nav>    
    );
};

export default Navbar;