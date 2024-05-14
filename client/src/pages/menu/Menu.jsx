import React, { useEffect, useState } from "react";
import axios from "axios";
import Dish from "../../components/Dishes/Dish";
import Navbar from "../../components/navbar/Navbar";
import "./Menu.css";
import food1 from "./food.jpg";
import footer from '../../components/shape/footer.svg';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);


  return (
    <div className="index">
      <Navbar />
      <img className="background" alt="background" src={food1} />
      <div className="Menu">Discover Our Menus</div>
      <div className="overlap-1">
        <Dish />
      </div>
    </div>
  );
};

export default Menu;
