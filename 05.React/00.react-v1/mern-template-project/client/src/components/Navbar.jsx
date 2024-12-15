import {Link} from "react-router-dom";
const Navbar=()=>{
    return (
        <nav className="navbar">
            <h1>Blog Web-Site:</h1>
            <div className="links">
                <Link to="/" className="button-85">Home</Link>
                
                <Link to="/create" className="button-85">New Blog</Link>
            </div>
        </nav>    
    );
};

export default Navbar;