import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Player.css";

const Player = (props) => {
  function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  const [isItAPicture, setIsItAPicture] = useState(false);

  const picture = `https://nba-players.herokuapp.com/players/${props.surname}/${props.name}`;

  isImgUrl(picture).then((res) => setIsItAPicture(res));
  
  return (
    <Link to={`/players/stats/${props.playerId}`}>
    <div className="container">
      <div className="slika">
        <img
          src={
            isItAPicture
              ? picture
              : "https://1000logos.net/wp-content/uploads/2017/04/Logo-NBA.png"
          }
          alt=""
        ></img>
      </div>
      <div className="data">
        <div>{`Name: ${props.name} `}</div>
        <div>{`Surname: ${props.surname} `}</div>
        {props.team?<div>{`Team: ${props.team}`}</div>:'Team: Former NBA player'}
        
        {props.height_feet ? (
          <div>
            {`Height: ${props.height_feet}ft ${
              props.height_inches ? props.height_inches + "in" : ""
            } `}{" "}
          </div>
        ) : (
          "Height: Unknown"
        )}
        {props.weight ? <div>Weight: </div> : null}
        <div>{`Position: ${
          props.position === "G"
            ? "Guard"
            : props.position === "C"
            ? "Center"
            : props.position === "F"
            ? "Forward"
            : props.position === "G-F"
            ? "Guard/Forward"
            : (props.position === "C-F" || props.position === "F-C")
            ? "Forward/Center"
            : "Unknown"
        } `}
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Player;
