// CategoryForm.js
import React, { useState } from 'react';

const CategoryForm = ({ onSubmit, closeModal }) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    const userId = localStorage.getItem('userId');
    console.log('User')
    e.preventDefault();
    const newDish = {
      category,
      name,
      quantity,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      image,
      catId:userId,
    };
    onSubmit(newDish);
  };

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

  return (
    <div className="category-modal">
      <form onSubmit={handleSubmit} className="category-form">
        <label>
          Category Name:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Dish Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Quantity:
          <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        <label>
          Ingredients (comma-separated):
          <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="file" accept="image/*" onChange={handleImageChange} required />
        {image && <img src={image} alt="Dish" className="preview-image" />}
        </label>
        <button type="submit">Add Dish</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default CategoryForm;
