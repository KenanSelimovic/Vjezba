import React, { useState, useEffect } from "react";
import Player from "./Player";
import { Link } from "react-router-dom";
import "../css/Players.css";
import { useParams } from "react-router-dom";

const Players = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState();
  const { pageNum } = useParams();
  console.log(pageNum);
  useEffect(() => {
    async function vrati() {
      setPage(pageNum);
      const promise = await fetch(
        `https://www.balldontlie.io/api/v1/players/?page=${pageNum}&per_page=25`
      );
      const json = await promise.json();
      console.log(json.data);
      setData(json.data);
    }
    vrati();
    window.scrollTo(0, 0);

    /*fetch(`https://www.balldontlie.io/api/v1/players/?page=${pageNum}&per_page=25`)   
      .then((res) => res.json())
      .then((json) => {
        setData(json.data);
      });*/
  }, [pageNum]);

  return (
    <>
      <ul>
        {/*data
          ? data.map((player) => {
              return (
                <li key={player.id}>
                  <Player
                    playerId={player.id}
                    name={player.first_name}
                    surname={player.last_name}
                    height_feet={player.height_feet}
                    height_inches={player.height_inches}
                    position={player.position}
                    team={player.team.full_name}
                  ></Player>
                </li>
              );
            })
          : null*/}
        {data?.map((player) => {
          return (
            <li key={player.id}>
              <Player
                playerId={player.id}
                name={player.first_name}
                surname={player.last_name}
                height_feet={player.height_feet}
                height_inches={player.height_inches}
                position={player.position}
                team={player.team.full_name}
              ></Player>
            </li>
          );
        })}
      </ul>
      <div
        style={{ display: "flex", justifyContent: "space-evenly" }}
        className="'dugmadi'"
      >
        <div id="left" className={!(page - 1) ? "disabled" : ""}>
          <Link to={`/players/${Number(pageNum) - 1}`}>Previous page</Link>
        </div>
        <>{page}</>
        <div id="right">
          <Link to={`/players/${Number(pageNum) + 1}`}>Next Page</Link>
        </div>
      </div>
    </>
  );
};

export default Players;
