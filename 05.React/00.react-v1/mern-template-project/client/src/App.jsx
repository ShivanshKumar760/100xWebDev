import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Create from './components/CreateBlog'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import BlogDetail from './components/BlogDetail'
function App() {
let greetingObject={greet:"Welcome to site",time:new Date().toLocaleTimeString(
      'en-IN', 
      { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric'})};
  return (
  <>
    <Router>
      <Navbar/>
      <br>
      </br>
      <div className='greet'>
          <h1>Hello User😊,{greetingObject.greet} and time is :
          {greetingObject.time}</h1>
      </div>
      <div className='content'>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/get/blog/:id" element={<BlogDetail/>}/>
        </Routes>
      </div>
    </Router>
    

    
  </>)};
export default App;
