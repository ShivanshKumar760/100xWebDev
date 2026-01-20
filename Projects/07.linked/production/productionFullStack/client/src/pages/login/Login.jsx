import { useRef ,useContext} from "react";
import { loginCall } from "../../apiCalls";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

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
          <h3 className="loginLogo">Linked</h3>
          <span className="loginDesc">
            Linked Get Connected.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="Email" required className="loginInput" ref={email} />
            <input placeholder="Password" required type="password" className="loginInput" ref={password} minLength="6"/>
             <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
