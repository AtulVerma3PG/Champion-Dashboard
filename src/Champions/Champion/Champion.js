/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown, faSort } from "@fortawesome/free-solid-svg-icons";
import * as ReactBootStrap from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import SearchField from "react-search-field";
import withLayout from "../../hoc/withLayout";
import "../Css/Champion.css";
import "bootstrap/dist/css/bootstrap.min.css";

const championNumbers = [10, 20, 50];
/**
 * This Function is responsible to show the main champions Grid
 *
 * Main Champions Page
 * @param {object} props The details of the champions grid as props
 */
const Champion = (props) => {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) !== null ? JSON.parse(localStorage.getItem("watchlist")) : [];
  const [modWatchlist, setWatchlist] = useState(watchlist);
  const updateWatchlist = (watchlst) => {
    localStorage.setItem("watchlist", JSON.stringify(watchlst));
  };

  useEffect(() => {
    updateWatchlist(modWatchlist);
  });

  const {
    allChampions, pageSize, onSearchEnter, openWatchlist,
    searchedText, champions, firstPage, lastPage, setPageSize, sortBy, sortOn,
  } = props;

  /**
   *Remove Champion to Watchlist
   *
   * @param {integer} event ChampionId to add
   */
  const removeChampion = (event) => {
    const watch = modWatchlist.filter((e) => e.id !== event);
    setWatchlist(watch, () => { updateWatchlist(modWatchlist); });
  };

  /**
   *Add Champion to Watchlist
   *
   * @param {Array} event Champion to add
   */
  const addChampion = (event) => {
    setWatchlist((watchlsts) => [...watchlsts, event]);
    updateWatchlist(modWatchlist);
  };

  const champLength = allChampions.length;
  const expectedDivisns = champLength / pageSize;
  const divisions = champLength % pageSize === 0
    ? expectedDivisns
    : Math.floor(expectedDivisns) + 1;
  const items = [];
  for (let number = 1; number <= divisions; number += 1) {
    // Adding Pagination
    items.push(
      <Pagination.Item
        key={number}
        active={number === props.page}
        onClick={() => props.setPage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col left">
            <SearchField
              placeholder="Search item"
              className="styledButton"
              value={searchedText}
              onChange={onSearchEnter}
            />
          </div>
          <div className="col right">
            <div className="display-inlineb">
              <DropdownButton
                title={`PageSize ( ${pageSize} )`}
                id="document-type"
                className="display-inlineb"
                onSelect={(e) => setPageSize(e)}
              >
                {championNumbers.map((opt) => (
                  <Dropdown.Item as="button" eventKey={opt} key={opt}>
                    {opt}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
            <button
              type="button"
              className="styledButton"
              id="openWatchlist"
              onClick={openWatchlist}
            >
              Watchlist ({modWatchlist.length})
            </button>

          </div>
        </div>

      </div>
      <div className="container">
        <ReactBootStrap.Table responsive="md" bordered hover>
          <thead>
            <tr>
              <th>Champion Profile</th>
              <th>
                <div className="heading" onClick={() => props.sort("id")}>
                  <div>
                    Champion ID
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSort} style={sortOn === "id" ? { display: "none" } : { display: "block" }} size="1x" />
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "id" ? { color: "red" } : { display: "none" }} size="1x" />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "id" ? { color: "red" } : { display: "none" }} size="1x" />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading" onClick={() => props.sort("name")}>
                  <div>
                    Name
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSort} style={sortOn === "name" ? { display: "none" } : { display: "block" }} size="1x" />
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "name" ? { color: "red" } : { display: "none" }} size="1x" />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "name" ? { color: "red" } : { display: "none" }} size="1x" />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading" onClick={() => props.sort("armor")}>
                  <div>
                    Armor
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSort} style={sortOn === "armor" ? { display: "none" } : { display: "block" }} size="1x" />
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "armor" ? { color: "red" } : { display: "none" }} size="1x" />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "armor" ? { color: "red" } : { display: "none" }} size="1x" />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading" onClick={() => props.sort("armorperlevel")}>
                  <div>
                    armorperlevel
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSort} style={sortOn === "armorperlevel" ? { display: "none" } : { display: "block" }} size="1x" />
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "armorperlevel" ? { color: "red" } : { display: "none" }} size="1x" />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "armorperlevel" ? { color: "red" } : { display: "none" }} size="1x" />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading" onClick={() => props.sort("hp")}>
                  <div>
                    hp
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSort} style={sortOn === "hp" ? { display: "none" } : { display: "block" }} size="1x" />
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "hp" ? { color: "red" } : { display: "none" }} size="1x" />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "hp" ? { color: "red" } : { display: "none" }} size="1x" />
                  </div>
                </div>
              </th>
              <th>Watchlist Action</th>
            </tr>
          </thead>
          <tbody>
            {champions.map((champion) => (
              <tr key={champion.id} className="center">
                <td>
                  <img src={champion.image_url} className="tableImage" alt={champion.image_url} />
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
                    {modWatchlist.filter((e) => e.id === champion.id)
                      .length === 0 && (
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => addChampion(champion)}
                      >
                        Add
                      </button>
                    )}
                    {modWatchlist.filter((e) => e.id === champion.id)
                      .length === 1 && (
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => removeChampion(champion.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
        {searchedText === "" && (
        <Pagination>
          <Pagination.First onClick={firstPage} />
          {items}
          <Pagination.Last onClick={lastPage} />
        </Pagination>
        )}
      </div>
    </div>
  );
};

Champion.propTypes = {
  allChampions: PropTypes.array.isRequired, // eslint-disable-line
  champions: PropTypes.array.isRequired, // eslint-disable-line
  setPageSize: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOn: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  sort: PropTypes.func.isRequired,
  watchlist: PropTypes.array.isRequired, // eslint-disable-line
  openWatchlist: PropTypes.func.isRequired,
  firstPage: PropTypes.func.isRequired,
  lastPage: PropTypes.func.isRequired,
  onSearchEnter: PropTypes.func.isRequired,
  searchedText: PropTypes.string.isRequired,
};

export default withLayout(Champion);
