import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import withLayout from "../hoc/withLayout";

/**
 * This Function is responsible to show the Watchlist
 *
 * @param {object} props Watchlist details
 */
const Watchlist = () => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) !== null ? JSON.parse(localStorage.getItem("watchlist")) : [];
  const [modWatchlist, setWatchlist] = useState(watchlist);
  const history = useHistory();
  const openHome = () => {
    history.push("/");
  };
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(modWatchlist));
  });
  /**
   * Update Local storage on state change
   */
  const removeChampion = (event) => {
    const watch = modWatchlist.filter((e) => e.id !== event);
    setWatchlist(watch);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col left"> <h2 className="watchlistHead">My Watchlist</h2></div>
          <div className="col right">
            <button
              type="button"
              id="openHome"
              className="styledButton"
              onClick={openHome}
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <ReactBootStrap.Table responsive="md" bordered hover>
          <thead>
            <tr className="center">
              <th>Champion Profile</th>
              <th>Champion ID</th>
              <th>Name</th>
              <th>Armor</th>
              <th>Armor per Level</th>
              <th>HP</th>
              <th>Watchlist Action</th>
            </tr>
          </thead>
          <tbody>
            {modWatchlist.map((champion) => (
              <tr key={champion.id} className="center">
                <td>
                  <img src={champion.image_url} className="tableImage" alt={champion.image_url} />
                </td>
                <td className="alignMiddle">{champion.id}</td>
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
    </div>
  );
};

export default withLayout(Watchlist);
