import { Link, useLocation } from "react-router-dom";
import "./searchPage.css"; // Import the CSS for styling

const SearchPage = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  return (
    <div className="searchPageContainer">
      <h1 className="searchTitle">Search Result:</h1>
      
      {userData ? (
        <Link to={`/profile/${userData.username}`} style={{ textDecoration: "none", color: "inherit" }}>
          <div className="userCard">
            <img
              className="userProfileImg"
              src={userData.profilePicture ? userData.profilePicture : PF + "person/noAvatar.png"}
              alt="Profile"
            />
            <span className="userName">{userData?.username}</span>
          </div>
        </Link>
      ) : (
        <p className="noUserMessage">No user found for this search.</p>
      )}
    </div>
  );
};

export default SearchPage;
