import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout";
import Players from "./components/Players";
import PlayerStats from "./components/PlayerStats";

function App() {
  return (
    <Layout>
      <div className="App">
        <Switch>
          <Route path={"/"} exact>
            <Redirect to={"/players/1"}></Redirect>
          </Route>
          <Route path="/players/stats/:pId">
            <PlayerStats />
          </Route>
          <Route path="/players/:pageNum" exact>
            <Players></Players>
          </Route>
        </Switch>
      </div>
      </Layout>
  );
}

export default App;
