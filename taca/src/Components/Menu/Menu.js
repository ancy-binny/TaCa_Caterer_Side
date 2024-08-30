import React, { useEffect, useState } from 'react';
import MenuSection from './MenuSection';
import CategoryForm from '../CategoryForm/CategoryForm';
import "./Menu.css";
import "../CategoryForm/CategoryForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import axios from '../../axiosConfig';

const Menu = ({ searchTerm }) => {
  const [menuData, setMenuData] = useState({});  // Initialize as an empty object
  const [isCategoryFormVisible, setIsCategoryFormVisible] = useState(false);

  useEffect(() => {

    fetchMenu();
  }, [isCategoryFormVisible]);

 

  const fetchMenu = async () => {
    const userId = localStorage.getItem('userId');
  
    try {
      console.log('Fetching menu data...');
      const response = await axios.get(`/menu/${userId}`);
      console.log(response.data);
      setMenuData(response.data);
    } catch (error) {
      console.error('Error fetching menu:', error);
      // Optionally, handle specific error types or display a user-friendly message
    }
  };
  
  
  // const filteredData = menuData.filter(item =>
  //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const addDish = (category, newDish) => {
    fetchMenu();
    setMenuData(prevMenuData => ({
      ...prevMenuData,
      [category]: prevMenuData[category] ? [...prevMenuData[category], newDish] : [newDish]
    }));

    
  };

  const handleAddDish = (newDish) => {
    const { category } = newDish;
    

    // Make an API call to add the new dish to the database
    axios.post('/menu', newDish)
      .then(response => {
        if (menuData[category]) {
          addDish(category, response.data); 
          setIsCategoryFormVisible(false);  // Add to the existing category
        } else {
          // Create new category if it doesn't exist
          setMenuData(prevMenuData => ({
            ...prevMenuData,
            [category]: [response.data]
          }));
        }
        setIsCategoryFormVisible(false); // Close the form modal
      })
      .catch(error => {
        console.error('There was an error adding the dish!', error);
      });
  };

  return (
    <div className="menu_div">
      {Object.keys(menuData).map((category, index) => (
        <MenuSection
          key={index}
          title={menuData[category].category} // Correctly pass the category name
          items={menuData[category]}
          addDish={addDish}
        />
      ))}
      <button onClick={() => setIsCategoryFormVisible(true)} className="add-dish-button">
        <FontAwesomeIcon icon={faCirclePlus} />
      </button>
      <div><strong>ADD NEW DISH WITH NEW CATAGORY</strong></div>
      {isCategoryFormVisible && (
        <CategoryForm
          onSubmit={handleAddDish}
          closeModal={() => setIsCategoryFormVisible(false)}
        />
      )}
    </div>
  );
};

export default Menu;
