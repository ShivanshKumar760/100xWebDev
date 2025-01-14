import { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data); 
      // Handle the uploaded image URL (e.g., display it, store it)
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. ' + (error.response && error.response.data 
                                      ? error.response.data 
                                      : 'An error occurred.')); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} accept="image/*" /> 
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;