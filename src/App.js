import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Champions from "./Champions/Champions";
import Watchlist from "./Champions/Watchlist";
// import "./Css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChampionDetail from "./Champions/Champion/ChampionDetail";

function App() {
  return (
    <>
      <Helmet><title> Champion Dashboard</title></Helmet>
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Champions} />
                <Route path="/ChampionWatchlist" component={Watchlist} name="watchlist" />
                <Route path="/ChampionDetails" component={ChampionDetail} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
