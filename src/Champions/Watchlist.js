import React from "react";
import { Navbar } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import "./Css/Champion.css";

/**
 * This Function is responsible to show the Watchlist
 *
 * @param {object} props Watchlist details
 */
const Watchlist = () => {
  const state = JSON.parse(localStorage.getItem("state"));
  const { watchlist } = state;
  const history = useHistory();
  const openHome = () => {
    history.push("/");
  };

  /**
   * Update Local storage on state change
   */
  const removeChampion = (event) => {
    state.watchlist = watchlist.filter((e) => e.id !== event);
    localStorage.setItem("state", JSON.stringify(state));
    window.location.reload(false);
  };

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand>My Watchlist</Navbar.Brand>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={openHome}
        >
          Home
        </button>
      </Navbar>
      <ReactBootStrap.Table responsive="md" bordered hover>
        <thead>
          <tr className="center">
            <th>Champion Profile</th>
            <th>Champion ID</th>
            <th>Name</th>
            <th>Armor</th>
            <th>armorperlevel</th>
            <th>hp</th>
            <th>Watchlist Action</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((champion) => (
            <tr key={champion.id} className="center">
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
              <td>{champion.hp}</td>
              <td>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => removeChampion(champion.id)}
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default Watchlist;
