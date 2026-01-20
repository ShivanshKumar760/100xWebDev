import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(''); // To store the uploaded image URL


  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        // Assuming your server-side endpoint for image upload is '/upload'
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        // console.log(response.data);
        setImageUrl(response.data.url); // Update the image URL after successful upload
        newPost.img = response.data.url; // Store the image URL in the post data
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle upload error (e.g., display an error message to the user)
        return;
      }
    }

    try {
      // console.log(newPost);
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/posts`, newPost);
      window.location.reload(); // Reload the page after successful post creation
    } catch (err) {
      console.error('Error creating post:', err);
      // Handle post creation error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ?user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={imageUrl} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}