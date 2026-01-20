import { useState } from 'react'
// import './App.css'

function App() {
  const [image, setImage] = useState(null);
  const [value,setValue]=useState("");
  const [response,setResponse]=useState("");
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const surpriseOptions=[
    "Does this image has a cat",
    "Is this image background red ",
    "Does this image has puppies"
  ];

  const surprise=()=>{
    const randomValue=surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
    setValue(randomValue);

  };


  const analyzeImage=async()=>{
    setLoading(true);
    setResponse("");
    if(!image)
    {
      setError("Error ! Must have an existing image!");
      //early return
      return;
    }

    try {
      const options={
        method:"POST",
        body:JSON.stringify({message:value}),
        headers:{"Content-type":"application/json"}
      };
      const response=await fetch("http://localhost:3000/openai",options);
      const answer=await response.text();
      setResponse(answer);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Something didn't work pls try again");
    }
  
  }

  const clear=()=>{
    setImage(null);
    setValue("");
    setResponse("");
    setError("");
  }
  const uploadImage=async (e)=>{
    console.log(e.target.files);
    const formData=new FormData();
    formData.append("file",e.target.files[0]);
    setImage(e.target.files[0]);
    e.target.value=null;

    try {
      const options={
        method:"POST",
        body:formData
      }

      const response=await fetch("http://localhost:3000/upload",options);
      const data=await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
      setError("Somthing didn't work pls try again!");
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
            <div class="shadow__input"></div>
              <button class="input__button__shadow">
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="20px" width="20px">
                <path d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z" fill-rule="evenodd" fill="#17202A"></path>
              </svg>
              </button>
            <input value={value} placeholder="What's in the image..." onChange={(e)=>{setValue(e.target.value)}} class="input__search"/>
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
