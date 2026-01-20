import { Link } from "react-router-dom";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  WorkOutline,
  Event,
} from "@material-ui/icons";
// import { Users } from "../../dummyData";
// import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <Link to="/" style={{textDecoration:"none", color:"inherit"}} >
            <span className="sidebarListItemText">Feed</span>
            </Link>
            
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <Link to="/messenger" style={{textDecoration:"none", color:"inherit"}}>
            <span className="sidebarListItemText">Chats</span>
            </Link>
            
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <Link to="https://www.youtube.com/" style={{textDecoration:"none", color:"inherit"}}>
              <span className="sidebarListItemText">Videos</span>
            </Link>
            
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <Link to="https://www.google.com/about/careers/applications/jobs/results" style={{textDecoration:"none", color:"inherit"}}>
            <span className="sidebarListItemText">Jobs</span>
            </Link>
            
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <Link to="https://in.bookmyshow.com/explore/events-national-capital-region-ncr" style={{textDecoration:"none", color:"inherit"}}>
            <span className="sidebarListItemText">Events</span>
            </Link>
            
          </li>
        </ul>
        {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
