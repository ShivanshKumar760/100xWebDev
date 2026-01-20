import React from 'react'
import logoNav from "../images/logoNav.png"
import { FiDownload } from "react-icons/fi";
import {Link} from "react-router-dom"

const EditiorNavbar = () => {
  return (
    <>
      <div className="EditiorNavbar flex items-center justify-between px-[100px] h-[80px] bg-[#141414]">
        <div className="logo">
        <Link to="/dashboard"><img className='w-[150px] cursor-pointer' src={logoNav} alt="" /></Link>
        </div>
        <p>File / <span className='text-[gray]'>My project</span></p>
        <i className='p-[8px] btn bg-black rounded-[5px] cursor-pointer text-[20px]'><FiDownload /></i>
      </div>
    </>
  )
}

export default EditiorNavbar