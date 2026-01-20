import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
//This file has a link
const MatchesDisplay=({matches,setClickedUser})=>{
  const [matchedProfiles, setMatchedProfiles] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const userId = cookies.UserId;
    const getMatches=async ()=>{
        try {
            const response=await axios.get("https://matchx.onrender.com/users",{
            params:{ userIds: JSON.stringify(matchedUserIds) },})
            setMatchedProfiles(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(matchedProfiles);
    useEffect(() => {
        getMatches();
      }, [matches]);
    // console.log("This is matched",matchedProfiles);
    const filteredMatchedProfiles = matchedProfiles?.filter(
        (matchedProfile) =>matchedProfile.matches.filter((profile) => profile.user_id == userId).length > 0
    );
    // console.log("Filtered Match",filteredMatchedProfiles);
    return (
        <div className="matches-display">
            <h1>Hey</h1>
          {filteredMatchedProfiles?.map((match, _index) => (
            <div
              key={_index}
              className="match-card"
              onClick={() => setClickedUser(match)}
            >
              <div className="img-container">
                <img src={match?.url} alt={match?.first_name + " profile"} />
              </div>
              <h3>{match?.first_name}</h3>
            </div>
          ))}
        </div>
    );
};


export default MatchesDisplay