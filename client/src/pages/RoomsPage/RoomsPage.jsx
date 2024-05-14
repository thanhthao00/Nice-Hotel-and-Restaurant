import React, { useEffect, useState } from "react";
import axios from "axios";
import Rooms from "../../components/Rooms/Rooms";
import Navbar from "../../components/navbar/Navbar";
import "./RoomsPage.css";
import Video from "./Video.mp4";
import Television from "./television.png";
import roomservice from "./waiter.png";
import hair from "./hair-dryer.png";
import coffee from "./coffee-cup.png";
import ac from "./air-conditioner.png";
import house from "./house-keeping.png";
import robes from "./robe.png";
import water from "./thin-bottle-of-water.png";
import fridge from "./mini.png";
import slipper from "./slippers.png";
import pillow from "./pillow.png";
import boiler from "./water-boiler.png";
import rectangle from "./rectangle.svg";
import footer from "../../components/shape/footer.svg";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios.get('api ở đây')
  //     .then((response) => setRooms(response.data))
  //     .catch((err) => setError(err));
  // }, []);

  // if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="index">
      <Navbar />
      <video width="100%" autoPlay controls>
        <source src={Video}></source>
      </video>
      <div className="text-wrapper-0">
        Each room boasts floor-to-ceiling windows offering expansive views of
        the vibrant blend of classic and contemporary
      </div>
      <div className="overlap-1">
        <div className="rectangle-1" />
        <div className="include">Include with every stay</div>
        <div className="text-wrapper-1">Television</div>
        <div className="text-wrapper-2">Room Service</div>
        <div className="text-wrapper-3">Hair Dryer</div>
        <div className="text-wrapper-4">Coffee maker</div>
        <div className="text-wrapper-5">Water</div>
        <div className="text-wrapper-6">Robes</div>
        <div className="text-wrapper-7">House Keeping</div>
        <div className="text-wrapper-8">Air Condition</div>
        <div className="text-wrapper-9">Water Boiler</div>
        <div className="text-wrapper-10">Pillow</div>
        <div className="text-wrapper-11">Slippers</div>
        <div className="text-wrapper-12">Refrigerator</div>
        <img className="tv" alt="tv" src={Television} />
        <img className="roomservice" alt="roomservice" src={roomservice} />
        <img className="hair" alt="hair" src={hair} />
        <img className="coffee" alt="coffee" src={coffee} />
        <img className="ac" alt="ac" src={ac} />
        <img className="house" alt="house" src={house} />
        <img className="robes" alt="robes" src={robes} />
        <img className="water" alt="water" src={water} />
        <img className="fridge" alt="fridge" src={fridge} />
        <img className="slipper" alt="slipper" src={slipper} />
        <img className="pillow" alt="pillow" src={pillow} />
        <img className="boiler" alt="boiler" src={boiler} />
      </div>
      <div className="text-wrapper-13">Our Rooms</div>
      <div className="room-list">
        <Rooms />
        <div className="attention">
          <div className="text-wrapper-21">Attention</div>
          <div className="end">
            <p className="text-wrapper-20">
              Children under 12 years old can share the same bedroom with 2 paying
              adults.
            </p>  
            <div className="text-wrapper-19">Voltage</div>
            <p className="text-wrapper-18">
              Local voltage of 220 - 240 AC. Adapters are available in all rooms.
            </p>
            <div className="text-wrapper-15">Check in:</div>
            <div className="text-wrapper-14">From 2:00 pm</div>
            <div className="text-wrapper-16">Check out:</div>
            <div className="text-wrapper-17">By 12:00 noon</div>
            <p className="time">
              The times may vary in regards to flight times and availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
