import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import "../css/PlayerStats.css";
import { teams } from "../logoUrls.js";
const PlayerStats = (props) => {
  const [season, setSeason] = useState(2022);
  const [stats, setStats] = useState([]);
  const [player, setPlayer] = useState({
    first_name: "",
    last_name: "",
    team: { abbreviation: "", full_name: "" },
  });
  console.log(player.team.abbreviation.toLowerCase());
  const { pId } = useParams();
  console.log(pId);
  useEffect(() => {
    console.log(pId);
    fetch(`https://www.balldontlie.io/api/v1/players/${pId}`)
      .then((res) => res.json())
      .then((json) => setPlayer(json));
  }, [pId]);
  useEffect(() => {
    fetch(
      `https://www.balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${pId}`
    )
      .then((res) => res.json())
      .then((json) => setStats(json.data));
  }, [season, pId]);

  function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  }

  const [isItAPicture, setIsItAPicture] = useState(false);

  const picture = `https://nba-players.herokuapp.com/players/${player.last_name}/${player.first_name}`;

  isImgUrl(picture).then((res) => setIsItAPicture(res));

  const pickYear = (e) => {
    setSeason(e.target.value);
  };

  console.log(player);

  return (
    <Wrapper>
      <div className="infoContainer">
        <div className="basicInfo">
          <img
            className="pic"
            src={
              isItAPicture
                ? picture
                : "https://1000logos.net/wp-content/uploads/2017/04/Logo-NBA.png"
            }
          ></img>
        </div>
        <div className="photo2Cont">
          <img
            src={`${teams[0][player.team.abbreviation.toLowerCase()]}`}
          ></img>
        </div>
        <div className="birajIStats">
          <select
            className="biraj"
            id="year"
            value={season}
            onChange={pickYear}
          >
            <option value="1990">1990</option>
            <option value="1991">1991</option>
            <option value="1992">1992</option>
            <option value="1993">1993</option>
            <option value="1994">1994</option>
            <option value="1995">1995</option>
            <option value="1996">1996</option>
            <option value="1997">1997</option>
            <option value="1998">1998</option>
            <option value="1999">1999</option>
            <option value="2000">2000</option>
            <option value="2001">2001</option>
            <option value="2002">2002</option>
            <option value="2003">2003</option>
            <option value="2004">2004</option>
            <option value="2005">2005</option>
            <option value="2006">2006</option>
            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
          <div className="stats">
            <strong>Season {season} stats: </strong>
            {stats.length ? (
              <div>
                <strong>Games played: {stats[0].games_played}</strong>
                <strong>Minutes per game: {stats[0].min}</strong>
                <strong>Points per game: {Number(stats[0].pts).toFixed(1)}</strong>
                <strong>Assists per game: {Number(stats[0].ast).toFixed(1)}</strong>
                <strong>Rebounds per game: {Number(stats[0].reb).toFixed(1)}</strong>
                <strong>Blocks per game: {Number(stats[0].blk).toFixed(1)}</strong>
                <strong>Steals per game: {Number(stats[0].stl).toFixed(1)}</strong>
                <strong>
                  Turnovers per game: {Number(stats[0].turnover).toFixed(1)}
                </strong>
              </div>
            ) : (
              `This player didnt play in the ${season} season`
            )}
          </div>
        </div>
        <h1 className="ime">{player.first_name + " " + player.last_name}</h1>
        <h1 className="tim">{player.team.full_name}</h1>
        
      </div>
    </Wrapper>
  );
};

export default PlayerStats;

const Wrapper = styled.div`
  border: 4px solid black;
  margin: 2rem;
  background-color: burlywood;
`;
