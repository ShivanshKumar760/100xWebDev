import "./rightbar.css";
// import { Users } from "../../dummyData";
// import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

/* eslint-disable react/prop-types */
export default function Rightbar({ user }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]); // Initialize as an empty array
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser?.followings?.includes(user?._id)
  );

  const [allUsers,setAllUsers]=useState([]);

  // console.log(user);
  // console.log("Current user",currentUser);
  //  console.log( user?._id);
  //  console.log("Current user id",currentUser._id);
  // console.log(followed);
  // console.log(import.meta.env.VITE_BACKEND_API)
  useEffect(() => {
    if (user && currentUser) {
      setFollowed(currentUser.followings.includes(user._id));
    }
  }, [user, currentUser]);
  useEffect(() => {
    const allUser=async ()=>{
      try{
        const res=await axios.get(`${import.meta.env.VITE_BACKEND_API}/users/all/`);
        // console.log("response is:",res.data);
        setAllUsers(res.data)
      }
      catch(err)
      {
        console.log(err);
      }
    }
    const getFriends = async () => {
      try {
        if (user && user._id) {
          const friendList = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/users/friends/` + user._id
          );
          // Ensure that the data is an array before setting it to friends
          setFriends(Array.isArray(friendList.data) ? friendList.data : []);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
    allUser();
  }, [user]);

  const handleClick = async () => {
    try {
      // Checking if we are following or unfollowing
      if (followed) 
        {
         const response =await axios.put(
          `${import.meta.env.VITE_BACKEND_API}/users/${user._id}/unfollow`,
          {
            userId: currentUser._id, // Current user's ID
          }
        );
        console.log(response);
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } 
      else {
        const response=await axios.put(
          `${import.meta.env.VITE_BACKEND_API}/users/${user._id}/follow`,
          {
            userId: currentUser._id, // Current user's ID
          }
        );
        console.log(response);
        dispatch({ type: "FOLLOW", payload: user._id });
      }
  
      // Toggle the followed state based on the action
      setFollowed(!followed);
    } catch (err) {
      console.error("Error during follow/unfollow request:", err.response || err);
      // Log additional error information
      if (err.response) {
        console.log("Error Response:", err.response);
        console.log("Error Status:", err.response.status);
        console.log("Error Data:", err.response.data);
      } else {
        console.log("Network or server error occurred.");
      }
    }
  };
  

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        {/* <h4 className="rightbarTitle">Online Friends</h4> */}
        {/* <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <span>All users</span>
        <div className="allUserList">
            
            {allUsers?.map((user,i)=>{
              return (<Link to={"/profile/" + user.username} style={{ textDecoration: "none" }} key={i}>
              <div className="rightbarFollowing">
                <img
                  src={
                    user.profilePicture
                      ?user.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarAllUserImg"
                />
                <span className="rightbarFollowingName">{user.username}</span>
              </div>
            </Link>)
            })}
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend, i) => (
            <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }} key={i}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
