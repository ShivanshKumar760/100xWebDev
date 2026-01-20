import { useRef, useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Link} from "react-router-dom";
import {Cancel} from "@material-ui/icons";



export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  console.log(import.meta.env.VITE_BACKEND_API);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const formData = new FormData();
        formData.append('file', file);
        if(file)
        {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImageUrl(response.data.url);
        // console.log("Image url:",response.data.url);
        user.profilePicture=response.data.url
        // console.log(user);
        }
        
        await axios.post(`${import.meta.env.VITE_BACKEND_API}/auth/register`, user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Linnked</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Linked.
          </span>
        </div>
        <div className="loginRight">
           {file && (
                    <div className="shareImgContainer">
                      <img className="shareImg" src={imageUrl} alt="" />
                      <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
            )}
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
         
            <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <Link to="/login">
              <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}