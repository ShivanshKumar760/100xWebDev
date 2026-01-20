import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer";
import {useCookies} from 'react-cookie'
import { useEffect } from "react";
import axios from 'axios'
//This file has links
const Dashboard=()=>{
    const [user, setUser] = useState(null);
    const [lastDirection, setLastDirection] = useState();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [genderedUsers, setGenderedUsers] = useState(null);
    const userId = cookies.UserId;
    // const characters = [
    //     {
    //       name: 'Richard Hendricks',
    //       url: 'https://i.imgur.com/oPj4A8u.jpeg'
    //     },
    //     {
    //       name: 'Erlich Bachman',
    //       url: 'https://i.imgur.com/Q9WPlWA.jpeg'
    //     },
    //     {
    //       name: 'Monica Hall',
    //       url: 'https://i.imgur.com/MWAcQRM.jpeg'
    //     }
    //   ]
    const getUser = async () => {
        try {
            const response = await axios.get('https://matchx.onrender.com/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    };
    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('https://matchx.onrender.com/gendered-users', {
                params: {gender: user?.gender_interest}//if user exist find gender_interest
            })
            setGenderedUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    };
    //single empty dependecy array means will take palce once while loading the 
    //dashboard screen
    useEffect(() => {
        getUser()

    }, []);

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])
    // console.log(user);
    // console.log(genderedUsers);
    

    const updateMatches= async (matchedUserId)=>{
        console.log("Called");
        try {
            const response=await axios.patch("https://matchx.onrender.com/addMatch",{userId,matchedUserId});
            console.log(response.data);
            getUser();
        } catch (error) {
            console.log(error);
        }
    };
    const swiped = (direction, swipedUserId) => {
    // console.log(direction);
    // console.log(swipedUserId);
      console.log('removing: ' + swipedUserId);
      if (direction === 'right') {
        updateMatches(swipedUserId)
    }
    setLastDirection(direction)
    }
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }
    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))
    console.log('filteredGenderedUsers ', filteredGenderedUsers)
    return(
        <>
        {user &&
        <div className="dashboard">
            <ChatContainer user={user}/>
            <div className="swipe-container">
                <div className="card-container">
                {filteredGenderedUsers?.map((genderedUser) =>
                <TinderCard className='swipe' key={genderedUser.first_name} onSwipe={(dir) => swiped(dir, genderedUser.user_id)} onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                    <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} className='card'>
                        <h3>{genderedUser.first_name}</h3>
                    </div>
                </TinderCard>)}
                <div className="swipe-info">
                    {lastDirection?<p>You swiped {lastDirection}</p>:<p></p>}
                </div>
                </div>
            </div>
            {/* <h1>This is Dashboard page!</h1> */}
        </div> }
        </> 
        // <h1>Hey</h1>
    )
}

export default Dashboard;
