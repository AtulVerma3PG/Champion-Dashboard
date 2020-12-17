import React from "react";
import PropTypes from "prop-types";
import { Navbar, DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import * as ReactBootStrap from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import SearchField from "react-search-field";
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
  const {
    allChampions, pageSize, onSearchEnter, openWatchlist,
    watchlist, searchedText, champions, firstPage, lastPage, setPageSize, sortBy, sortOn,
  } = props;
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>My Champions Dashboard</Navbar.Brand>

        <SearchField
          placeholder="Search item"
          value={searchedText}
          onChange={onSearchEnter}
        />

        <div className="display-inlineb">
          <p className="navText">Please select page size</p>
          <DropdownButton
            title={pageSize}
            id="document-type"
            className="pageSize display-inlineb"
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
          className="btn btn-primary btn-lg"
          id="openWatchlist"
          onClick={openWatchlist}
        >
          Watchlist ({watchlist.length})
        </button>

      </Navbar>

      <div>
        <ReactBootStrap.Table responsive="md" bordered hover>
          <thead>
            <tr className="center">
              <th>Champion Profile</th>
              <th>
                <div className="heading">
                  <div>
                    Champion ID
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "id" ? { color: "red" } : { color: "black" }} size="1x" onClick={() => props.sortAsc("id")} />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "id" ? { color: "red" } : { color: "black" }} size="1x" onClick={() => props.sortDesc("id")} />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading">
                  <div>
                    Name
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "name" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortAsc("name")} />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "name" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortDesc("name")} />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading">
                  <div>
                    Armor
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "armor" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortAsc("armor")} />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "armor" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortDesc("armor")} />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading">
                  <div>
                    armorperlevel
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "armorperlevel" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortAsc("armorperlevel")} />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "armorperlevel" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortDesc("armorperlevel")} />
                  </div>
                </div>
              </th>
              <th>
                <div className="heading">
                  <div>
                    hp
                  </div>
                  <div className="sortIcon">
                    <FontAwesomeIcon icon={faSortUp} style={sortBy === "Asc" && sortOn === "hp" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortAsc("hp")} />
                    <FontAwesomeIcon icon={faSortDown} style={sortBy === "Desc" && sortOn === "hp" ? { color: "#FF0000" } : { color: "black" }} size="1x" onClick={() => props.sortDesc("hp")} />
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
                    {props.watchlist.filter((e) => e.id === champion.id)
                      .length === 0 && (
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => props.addToWatchList(champion)}
                      >
                        Add
                      </button>
                    )}
                    {props.watchlist.filter((e) => e.id === champion.id)
                      .length === 1 && (
                      <button
                        type="button"
                        className="btn btn-primary btn-lg"
                        onClick={() => props.removeFromWatchlist(champion.id)}
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
  addToWatchList: PropTypes.func.isRequired,
  removeFromWatchlist: PropTypes.func.isRequired,
  watchlist: PropTypes.array.isRequired, // eslint-disable-line
  openWatchlist: PropTypes.func.isRequired,
  firstPage: PropTypes.func.isRequired,
  lastPage: PropTypes.func.isRequired,
  sortAsc: PropTypes.func.isRequired,
  sortDesc: PropTypes.func.isRequired,
  onSearchEnter: PropTypes.func.isRequired,
  searchedText: PropTypes.string.isRequired,
};

export default Champion;
