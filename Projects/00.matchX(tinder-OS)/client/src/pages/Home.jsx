import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import { useState } from "react";
const Home=({userCookie})=>{
    let [showModal,setShowModal]=useState(false);
    const[isSignUp,setIsSignUp]=useState(true)
    const authToken=false;
    const handleClick=()=>{
        console.log("Clicked!");
        console.log(showModal)
        setShowModal((prevState)=>{
            return true
        });
        setIsSignUp(true);
        console.log(showModal);
    }
    return (
        <div className="overlay">
        <Navbar minimalBackground={false}
                setShowModal={setShowModal} 
                showModal={showModal}
                setIsSignUp={setIsSignUp}
        />
        <div className="home">
            <h1 className="primary-title">Swipe Right!</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken?"Logout":"Sign-Up"}
            </button>

            {showModal && <AuthModal 
                            setShowModal={setShowModal}
                            setIsSignUp={setIsSignUp}
                            isSignUp={isSignUp}/>}
        </div>
        </div>
    )
};

export default Home;
