import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [imageUrls, setImageUrls] = useState([]);

  const fetchImageUrls = async () => {
    try {
      const response = await fetch('http://localhost:3001/images');
      if (response.ok) {
        const imageList = await response.json();
        setImageUrls(imageList);
      } else {
        console.error('Ошибка при загрузке списка изображений');
      }
    } catch (error) {
      console.error('Ошибка при загрузке списка изображений:', error);
    }
  };

  useEffect(() => {
    fetchImageUrls();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:3001/images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Файл успешно загружен');
        fetchImageUrls();
      } else {
        console.error('Ошибка загрузки файла');
      }
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
    }
  };

  return (
    <div className="App">
      <div className='header color'>
      <h1 className='title'>Your gallery</h1>
      <h2 className='subtitle'>save the moments...</h2>
      </div>
      <div className='input'>
        <input className='button' type="file" id='input-file' accept="image/*" multiple onChange={handleFileUpload} />
        <label htmlFor='input-file' className='input-button color'>
          <span><img className='wing' src="png/wing.png" alt="Select" /></span>
        </label>
      </div>
     <div className='image-gallery'>
        {imageUrls.map((image, index) => (
          <img key={index} src={`http://localhost:3001${image}`} alt={`Image ${index}`} />
        ))}
      </div>
      <div className='footer color'>
      </div>
    </div>
  );
}

export default App;
