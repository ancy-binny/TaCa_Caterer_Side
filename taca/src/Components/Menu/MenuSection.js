import React, { useEffect, useState } from 'react';
import DishCard from './DishCard';
import DishForm from './DishForm';

const MenuSection = ({ title, items,addDish }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dish, setDish] = useState(false);
  
// console.log('menu',items)

  const openModal = () => {
    setIsOpen(true);
    setIsFormVisible(true);
  };

  // useEffect(() => {
  //   console.log('fdakj',items.dishes);
  //   setDish(items.dishes)
  // }, [isExpanded])
  

  const closeModal = () => {
    setIsOpen(false);
    setIsFormVisible(false);
  };

  const toggleExpand = () => {
    setDish(items.dishes)
    setIsExpanded(!isExpanded);
  };

  const handleAddDish = (newDish) => {
    addDish(title, newDish);  // Ensure `title` is correctly passed
    closeModal();
  };

  return (
    <div>
      <div className="title-container" onClick={toggleExpand}>
        <h2>{title}</h2>
      </div>
      {isExpanded && (
        <div>
          <div className="card-container">
            {dish.map((item, index) => (
              <DishCard key={index} item={item} />
            ))}
          </div>
          <button onClick={openModal}>+ Add Dish</button>
          {isFormVisible && <DishForm onSubmit={handleAddDish} toggle={toggleExpand} closeModal={closeModal} category={title} />}
        </div>
      )}
    </div>
  );
};

export default MenuSection;
