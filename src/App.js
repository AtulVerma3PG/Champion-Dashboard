import React, { Component } from "react"; /*eslint-disable */
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Champions from "./Champions/Champions";
import Watchlist from "./Champions/Watchlist";
import "./Css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ChampionDetail from "./Champions/Champion/ChampionDetail";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Champions} />
                <Route path="/ChampionWatchlist" component={Watchlist} />
                <Route path="/ChampionDetails" component={ChampionDetail} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
        {/* <Champions /> */}
      </div>
    );
  }
}

export default App;
