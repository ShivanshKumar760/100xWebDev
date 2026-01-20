import { useRef ,useContext} from "react";
import { loginCall } from "../../apiCalls";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import {Link} from "react-router-dom";

import logo from "../../images/logoLight.png"
export default function Login() {
  const email=useRef();
  const password=useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleSubmit=(e)=>{
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <h3 className="loginLogo">Linked</h3> */}
          <img src={logo} alt="loginPage-logo" className="loginPageLogo"/>
          <span className="loginDesc">
            Linked Get Connected.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <label>Enter Mail:</label>
            <input placeholder="Email" required className="loginInput" ref={email} />
            <label>Enter Password:</label>
            <input placeholder="Password" required type="password" className="loginInput" ref={password} minLength="6"/>
             <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <Link to="/register">
            <button className="loginRegisterButton">
              Create a New Account
            </button>
            </Link>
            
          </form>
        </div>
      </div>
    </div>
  );
}
