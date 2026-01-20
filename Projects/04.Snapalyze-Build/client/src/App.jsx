import { useState } from 'react'
// import './App.css'

function App() {
  const [image, setImage] = useState(null);
  const [value,setValue]=useState("");
  const [response,setResponse]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);
  const [imageUrl, setImageUrl] = useState("");  // To store the uploaded image URL

  const surpriseOptions=[
    "Does this image has a cat",
    "Is this image background red ",
    "Does this image has puppies"
  ];

  const surprise=()=>{
    const randomValue=surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);

  };


  // const analyzeImage=async()=>{
  //   setLoading(true);
  //   setResponse("");
  //   if(!image)
  //   {
  //     setError("Error ! Must have an existing image!");
  //     //early return
  //     return;
  //   }

  //   try {
  //     const options={
  //       method:"POST",
  //       body:JSON.stringify({message:value}),
  //       headers:{"Content-type":"application/json"}
  //     };
  //     const response=await fetch("https://snapalyze.onrender.com/openai",options);
  //     const answer=await response.text();
  //     setResponse(answer);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setError("Something didn't work pls try again");
  //   }
  
  // }


  const analyzeImage = async () => {
    setLoading(true);
    setResponse("");
    if (!imageUrl) {
      setError("Error! Must have an existing image URL!");
      // early return
      return;
    }

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({ message: value, imageUrl: imageUrl }), // Send both message and image URL
        headers: { "Content-type": "application/json" }
      };
      const response = await fetch("https://snapalyze.onrender.com/openai", options);
      const answer = await response.text();
      setResponse(answer);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Something didn't work, please try again!");
    }
  };

  const clear=()=>{
    setImage(null);
    setValue("");
    setResponse("");
    setError("");
    setImageUrl("");  // Reset the image URL when clearing
  }
  const uploadImage=async (e)=>{
    console.log(e.target.files);
    const formData=new FormData();
    formData.append("file",e.target.files[0]);
    setImage(e.target.files[0]);
    // e.target.value=null;

    try {
      const options={
        method:"POST",
        body:formData
      }

      const response=await fetch("https://snapalyze.onrender.com/upload",options);
      const data=await response.json();
      console.log(data);
      //New Part added to get the image url from cloudinary
      if(data && data.imageUrl) {
        setImageUrl(data.imageUrl);  // Set the image URL from Cloudinary response
      }
    } catch (error) {
      console.log(error);
      setError("Something didn't work, please try again!");
    }
  }
  return (
    <>
    <div className='app'>
      <h1>Snapalyze</h1>
      <section className='search-section'>
          <div className="image-container">
            {image && <img className="uploadImageSection" src={URL.createObjectURL(image)} />}
          </div>
          <p className="extra-info">
            <span>
              <label htmlFor="files" className="upload-label">Upload an Image</label>
              <br />
              <input 
                className="uploadButton" 
                onChange={uploadImage} 
                type="file" 
                id="files" 
                accept="image/*" 
                name='file'
              />
            </span>
          </p>


          <p className='user-info-container'>
            <span className='user-info'>What do you want to know about the image ?</span>
            <button className='surprise' onClick={surprise} disabled={response}>Surprise me</button>
          </p>
          <br/>
          <br/>
          <div className='askME'>
          <div className="input-container input__container">
            <div className="shadow__input"></div>
              <button className="input__button__shadow">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fillRule="evenodd" fill="#17202A"></path>
              </svg>
              </button>
            <input value={value} placeholder="What's in the image..." onChange={(e)=>{setValue(e.target.value)}} className="input__search"/>
          </div>
          {(!response && !error)&&<button onClick={analyzeImage}>Ask Me</button>}

          {(response || error)&&<button onClick={clear}>Clear</button>}

          </div>
         

          {error && <p>{error}</p>}
          {loading ? "Loading":response && <p className='answer'>{response}</p>}
      </section>

      <br/>

    </div>
    </>
  )
}

export default App
