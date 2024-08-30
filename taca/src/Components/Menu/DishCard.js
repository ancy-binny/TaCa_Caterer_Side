import React, { useState } from 'react';
import './DishCard.css'; // Make sure to import the CSS file

const DishCard = ({ item, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  // Function to handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
    setEditedItem({ ...item });
  };

  // Function to handle delete button click
  const handleDelete = () => {
    onDelete(item);
  };

  // Function to handle modal save
  const handleSave = () => {
    onEdit(editedItem);
    setIsEditing(false);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="dcard">
      <img src={item.image} alt={item.name} />
      <div className="dcard-content">
        <h3>{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Ingredients: {item.ingredients.join(', ')}</p>
      </div>
      <div className="dcard-buttons">
        <button onClick={handleEdit} className="edit-button">Edit</button>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>

      {/* Modal for editing */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancel}>&times;</span>
            <h2>Edit Dish</h2>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={editedItem.image}
                onChange={(e) => setEditedItem({ ...editedItem, image: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Quantity:</label>
              <input
                type="text"
                value={editedItem.quantity}
                onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Ingredients:</label>
              <input
                type="text"
                value={editedItem.ingredients.join(', ')}
                onChange={(e) => setEditedItem({ ...editedItem, ingredients: e.target.value.split(', ') })}
              />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DishCard;
