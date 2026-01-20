import { useState } from "react";
import codeLogo from "../images/codeLogo.png"
import deleteGridLogo from "../images/deleteGridLogo.png"
import { useNavigate } from 'react-router-dom';
import { api_base_url } from "../helper";
/* eslint-disable react/prop-types */
const GridCard = ({item}) => {
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const navigate = useNavigate();

  const deleteProj = (id) => {
    fetch(api_base_url + "/deleteProject",{
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        progId: id,
        userId: localStorage.getItem("userId")
      })
    }).then(res=>res.json()).then(data=>{
      if(data.success){
        setIsDeleteModelShow(false)
        window.location.reload()
      }else{
        alert(data.message)
        setIsDeleteModelShow(false)
      }
    })
  };
  return (
    <>
        <div className="gridCard bg-[#141414] w-[250px] h-[190px] p-[10px] cursor-pointer hover:bg-[#202020] rounded-2xl shadow-lg shadow-black/50">
            <div onClick={()=>{navigate(`/editior/${item._id}`)}}>
              <img className="w-[70px]" src={codeLogo} alt="code-log" />
              <h3 className="text-[25px] w-[90%] line-clamp-1 mt-4">{item.title}</h3>
            </div>
            <div className="flex items-center justify-between" >
              <p className="text-[grey] text-[12px]">Created on {new Date(item.date).toDateString()}</p>
              <img  onClick={()=>{setIsDeleteModelShow(true)}} className="w-[30px] cursor-pointer "  src={deleteGridLogo} alt="delete-logo" />
            </div>
        </div>

        {
        isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className='text-3xl'>Do you want to delete <br />
              this project</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button  onClick={()=>{deleteProj(item._id)}} className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
              <button onClick={()=>{setIsDeleteModelShow(false)}} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>
        </div> : ""
      }
    </>
  )
}

export default GridCard;