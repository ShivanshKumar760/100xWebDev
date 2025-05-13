const Navbar=()=>{
    return (
        <nav className="navbar">
            <h1>Blog Web-Site:</h1>
            <div className="links">
                <a href="/" style={{
                    color:"white",
                    backgroundColor:"#f1356d",
                    borderRadius:"10px",
                    padding:"10px"
                }}>Home</a>
                
                <a href="/create" style={{
                    color:"white",
                    backgroundColor:"#f1356d",
                    borderRadius:"10px",
                    padding:"10px"
                }}>New Blog</a>
            </div>
        </nav>    
    );
};

export default Navbar;