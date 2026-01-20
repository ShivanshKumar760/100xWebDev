import logo from "../images/matchXTitle.png";
import icon from "../images/matchXLogo.png";
const Navbar=({minimalBackground,setShowModal,showModal,setIsSignUp})=>{
    const handleClick=()=>{
        setShowModal((prevState)=>{
            return true;
        })
        setIsSignUp((prevState)=>{
            return false;
        })
    }
    const authToken=false;
    return(
        <nav>
            <div className="logo-container">
                <img className="logo" src={minimalBackground?logo:icon} alt=""/>
            </div>
            {!authToken && !minimalBackground &&
            <button className="nav-button button-30" onClick={handleClick} disabled={showModal}>
                Log in
            </button>}
        </nav>  
    )
};
export default Navbar;