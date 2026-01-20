import './App.css'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editior from './pages/Editior';
import Landing from './pages/Landing';
import { useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const navigate = useNavigate();  // Using useNavigate for redirection

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <>
    <BrowserRouter>
      <Routes>
        {isAuthenticated? <Route path="/dashboard" element={<Home/>}/>:<Route path='/' element={<Landing/>}/>}
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NoPage/>}/>
        {/* <Route path='/editior/:projectID' element={isLoggedIn ? <Editior /> : <Navigate to="/login"/>} />
         */}

        <Route path='/editior/:projectID' element={isAuthenticated? <Editior />:<Navigate to="/login"/>}/>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
