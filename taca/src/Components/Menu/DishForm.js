import React, { useState } from 'react';
import axios from '../../axiosConfig';
import { useUser } from '../../Context/userContext';
import './DishForm.css'

const DishForm = ({ onSubmit,toggle, closeModal, category }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');
  const { user } = useUser();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxSize = 150; // maximum width or height
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxSize) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          setImage(canvas.toDataURL('image/jpeg'));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    console.log('bcd',user.email );
    
    e.preventDefault();
    const newDish = {
      name,
      quantity,
      ingredients: ingredients.split(',').map((ing) => ing.trim()),
      image,
      category
    };

    try {
      console.log(newDish);
      const response = await axios.post('/menu', newDish);
      console.log(response.data); // Handle success
      onSubmit(newDish);
      toggle(); // Optionally handle form submission locally
      closeModal();
    } catch (error) {
      console.error('Error adding dish:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Dish Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter dish name"
          required
        />
      </div>
      <div>
        <label>Quantity:</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          required
        />
      </div>
      <div>
        <label>Ingredients (comma-separated):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients"
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
        {image && <img src={image} alt="Dish" className="preview-image" />}
      </div>
      <button type="submit">Add Dish</button>
    </form>
  );
};

export default DishForm;
