import React from "react";
import { Navbar } from "react-bootstrap";
import * as ReactBootStrap from "react-bootstrap";
import _ from "lodash";
import "./Css/Champion.css";
import { Link } from "react-router-dom";

/**
 * This Function is responsible to show the Watchlist
 *
 * @param {object} props Watchlist details
 */
const Watchlist = (props) => {
  const champions = _.get(props, "location.state.watchlist");
  const state = _.get(props, "location.state");
  const { history } = props;
  const openHome = () => {
    history.push("/", champions);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>My Watchlist</Navbar.Brand>
        <Link
          to={{
            pathname: "/",
            state,
          }}
        >
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={openHome}
          >
            Home
          </button>
        </Link>
      </Navbar>
      <ReactBootStrap.Table responsive="md" bordered hover>
        <thead>
          <tr>
            <th>Champion Profile</th>
            <th>Champion ID</th>
            <th>Name</th>
            <th>Armor</th>
            <th>armorperlevel</th>
            <th>attackdamage</th>
            <th>hp</th>
            <th>hpperlevel</th>
            <th>hpregen</th>
            <th>hpregenperlevel</th>
            <th>movespeed</th>
            <th>mp</th>
          </tr>
        </thead>
        <tbody>
          {champions.map((champion) => (
            <tr key={champion.id}>
              <td>
                <img src={champion.image_url} alt={champion.image_url} />
              </td>
              <td>{champion.id}</td>
              <td>
                <Link
                  to={{
                    pathname: "/ChampionDetails",
                    state: { champion },
                  }}
                >
                  {champion.name}
                </Link>
              </td>
              <td>{champion.armor}</td>
              <td>{champion.armorperlevel}</td>
              <td>{champion.attackdamage}</td>
              <td>{champion.hp}</td>
              <td>{champion.hpperlevel}</td>
              <td>{champion.hpregen}</td>
              <td>{champion.hpregenperlevel}</td>
              <td>{champion.movespeed}</td>
              <td>{champion.mp}</td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

Watchlist.propTypes = {
  history: Object.isRequired,
};

export default Watchlist;
