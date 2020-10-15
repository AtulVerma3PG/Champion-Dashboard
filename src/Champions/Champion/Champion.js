/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import { Navbar, DropdownButton, Dropdown } from "react-bootstrap";

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
  const champLength = props.allChampions.length;
  const { pageSize } = props;
  const expectedDivisns = champLength / pageSize;
  // eslint-disable-next-line operator-linebreak
  const divisions =
    champLength % pageSize == 0
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
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>My Champions Dashboard</Navbar.Brand>

        <p className="navText">Please select page size</p>
        <DropdownButton
          title={props.pageSize}
          id="document-type"
          className="pageSize"
          onSelect={(e) => props.setPageSize(e)}
        >
          {championNumbers.map((opt) => (
            <Dropdown.Item as="button" eventKey={opt} key={opt}>
              {opt}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={props.openWatchlist}
          >
            Watchlist ({props.watchlist.length})
          </button>
        </div>
      </Navbar>

      <SearchField
        placeholder="Search item"
        value={props.searchedText}
        onChange={props.onSearchEnter}
      />

      <div>
        <ReactBootStrap.Table responsive="md" bordered hover>
          <thead>
            <tr>
              <th>Champion Profile</th>
              <th>
                Champion ID
                <br />
                <span
                  onClick={() => props.sortAsc("id")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("id")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                Name
                <br />
                <span
                  onClick={() => props.sortAsc("name")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("name")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                Armor
                <br />
                <span
                  onClick={() => props.sortAsc("armor")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("armor")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                armorperlevel
                <br />
                <span
                  onClick={() => props.sortAsc("armorperlevel")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("armorperlevel")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                  key="armorperlevel"
                />
              </th>
              <th>
                attackdamage
                <br />
                <span
                  onClick={() => props.sortAsc("attackdamage")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("attackdamage")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                hp
                <br />
                <span
                  onClick={() => props.sortAsc("hp")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("hp")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                hpperlevel
                <br />
                <span
                  onClick={() => props.sortAsc("hpperlevel")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("hpperlevel")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                hpregen
                <br />
                <span
                  onClick={() => props.sortAsc("hpregen")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("hpregen")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                movespeed
                <br />
                <span
                  onClick={() => props.sortAsc("movespeed")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("movespeed")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>
                mp
                <br />
                <span
                  onClick={() => props.sortAsc("mp")}
                  className="glyphicon glyphicon-sort-by-attributes"
                />{" "}
                <span
                  onClick={() => props.sortDesc("mp")}
                  className="glyphicon glyphicon-sort-by-attributes-alt"
                />
              </th>
              <th>WatchList Action</th>
            </tr>
          </thead>
          <tbody>
            {props.champions.map((champion) => (
              <tr key={champion.id}>
                <td>
                  <img src={champion.image_url} alt={champion.image_url} />
                </td>
                <td>{champion.id}</td>
                <td>
                  <span onClick={() => props.openChampionDetails(champion)}>
                    {champion.name}
                  </span>
                </td>
                <td>{champion.armor}</td>
                <td>{champion.armorperlevel}</td>
                <td>{champion.attackdamage}</td>
                <td>{champion.hp}</td>
                <td>{champion.hpperlevel}</td>
                <td>{champion.hpregen}</td>
                <td>{champion.movespeed}</td>
                <td>{champion.mp}</td>
                <td>
                  <div>
                    {props.watchlist.filter((e) => e.id === champion.id)
                      .length == "0" && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => props.addToWatchList(champion)}
                      >
                        Add
                      </button>
                    )}
                    {props.watchlist.filter((e) => e.id === champion.id)
                      .length == "1" && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
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
        <Pagination>
          <Pagination.First onClick={props.firstPage} />
          {items}
          <Pagination.Last onClick={props.lastPage} />
        </Pagination>
      </div>
    </div>
  );
};

Champion.propTypes = {
  allChampions: PropTypes.array.isRequired, // eslint-disable-line
  champions: PropTypes.array.isRequired, // eslint-disable-line
  setPageSize: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
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
  openChampionDetails: PropTypes.func.isRequired,
};

export default Champion;
