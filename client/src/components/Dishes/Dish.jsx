import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dish.css";
import starter1 from "./starter1.jpg";
import starter2 from "./starter2.jpg";
import starter3 from "./starter3.jpg";
import starter4 from "./starter4.jpg";
import starter5 from "./starter5.jpg";
import starter6 from "./starter6.jpg";
import fish1 from "./fish1.jpg";
import fish2 from "./fish2.jpg";
import fish3 from "./fish3.jpg";
import fish4 from "./fish4.jpg";
import meat1 from "./meat1.jpg";
import meat2 from "./meat2.jpg";
import meat3 from "./meat3.jpg";
import meat4 from "./meat4.jpg";
import dessert1 from "./dessert1.jpg";
import dessert2 from "./dessert2.jpg";
import dessert3 from "./dessert3.jpg";
import dessert4 from "./dessert4.jpg";
import rectangle from "./rectangle.svg";

const Dish = () => {
  const [dish, setDish] = useState([]);
  const [error, setError] = useState({});

  const capitalize = (string) => {
    return string.toUpperCase();
  };

  const groupDishesByType = () => {
    const groupedDishes = {};

    dish.forEach((dishItem) => {
      const dishType = dishItem.dish_type;

      if (!groupedDishes[dishType]) {
        groupedDishes[dishType] = [];
      }

      groupedDishes[dishType].push(dishItem);
    });

    return groupedDishes;
  };

  const getDishImage = (dish_name) => {
    switch (dish_name) {
      case "Carpaccio":
        return starter1;
      case "Orange Salad":
        return starter2;
      case "Apple and Duck":
        return starter3;
      case "Artichoke velouté":
        return starter4;
      case "Comté cheese soup":
        return starter5;
      case "Eggs and Toast":
        return starter6;
      case "European lobster parmentier":
        return fish1;
      case "Shrimp rice":
        return fish2;
      case "Grilled Salmon":
        return fish3;
      case "Spicy Grilled Calamari Salad":
        return fish4;
      case "Cannellonis":
        return meat1;
      case "Goose Leg":
        return meat2;
      case "Filet Mignon":
        return meat3;
      case "Baked Lamb Chops":
        return meat4;
      case "Chocolate Cake":
        return dessert1;
      case "Crème Brûlée":
        return dessert2;
      case "Fruit Sorbet":
        return dessert3;
      default:
        return dessert4;
    }
  };

  // Get dishes grouped by their types
  const groupedDishes = groupDishesByType();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://nice-handr-server1.onrender.com/api/dish/get_all_dish_public"
        );
        console.log(response.data);
        const { success, dishes } = response.data;
        setDish(dishes);
      } catch (error) {
        console.error("Error fetching dish list:", error);
        setError(error);
      }
    };

    fetchData();
  }, []); // Run only once when the component is mounted

  return (
    <div className="dishContainer">
      {Object.keys(groupedDishes).map((dishType, index) => (
        <div key={index} className="dishType">
          <div className="type-name">{capitalize(dishType)}</div>
          <div className="list">
            {(groupedDishes[dishType] || []).map((dishItem, subIndex) => (
              <div key={subIndex} className="dish">
                <img className="dish-img" alt="img" src={getDishImage(dishItem.dish_name)}/>
                <div className="dishInfo">
                    <div className="name">{dishItem.dish_name}</div>
                    <p>{dishItem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dish;
