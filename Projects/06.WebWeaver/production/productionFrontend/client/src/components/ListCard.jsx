import codeLogo from "../images/codeLogo.png"
import deleteLogo from "../images/deleteLogo.png"
import { useState } from "react";
import { api_base_url } from "../helper.js";
import { useNavigate } from 'react-router-dom';
/* eslint-disable react/prop-types */
const ListCard = ({item}) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);

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
    
    <div className="listCard mb-2 w-[full] flex items-center justify-between p-[11px] bg-[#141414] rounded-lg cursor-pointer hover:bg-[#202020]">
        <div onClick={()=>{navigate(`/editior/${item._id}`)}} className='flex items-center gap-2'>
            <img className="w-[65px] " src={codeLogo} alt="code-logo"/>
            <div>
              <h3 className="text-[22px]">{item.title}</h3>
              <p className="text-[grey] -mt-1 text-[14px]">Created on {new Date(item.date).toDateString()}</p>
            </div>
        </div>

       <div>
            {/* <img className="w-[50px] cursor-pointer mr-5"  src={deleteLogo} alt="delete-logo" /> */}
            <img onClick={()=>{setIsDeleteModelShow(true)}} className='w-[50px] cursor-pointer mr-5' src={deleteLogo} alt="delete-logo" />
       </div>
    </div>

    {/* <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.2)] flex items-center justify-center flex-col z-50">
        <div className="mainModel w-[24vw] h-[25vh] bg-[#4b4848] rounded-lg p-[20px]">
            <h3 className="text-3xl">Do You want to delete <br/> this project</h3>

            <div className="flex items-center gap-2 w-full mt-5">
                <button className="p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]">Delete</button>
                <button className="p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]">Cancel</button>
            </div>
        </div>
    </div> */}


{
        isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className='text-3xl'>Do you want to delete <br />
              this project</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button onClick={()=>{deleteProj(item._id)}} className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
              <button onClick={()=>{setIsDeleteModelShow(false)}} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>
        </div> : ""
      }

{/* 
{
        isDeleteModelShow ? <div className="model fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.1)] flex justify-center items-center flex-col">
          <div className="mainModel w-[25vw] h-[25vh] bg-[#141414] rounded-lg p-[20px]">
            <h3 className='text-3xl'>Do you want to delete <br />
              this project</h3>
            <div className='flex w-full mt-5 items-center gap-[10px]'>
              <button  className='p-[10px] rounded-lg bg-[#FF4343] text-white cursor-pointer min-w-[49%]'>Delete</button>
              <button onClick={()=>{setIsDeleteModelShow(false)}} className='p-[10px] rounded-lg bg-[#1A1919] text-white cursor-pointer min-w-[49%]'>Cancel</button>
            </div>
          </div>
        </div> : ""
      } */}

    </>
  )
}

export default ListCard;