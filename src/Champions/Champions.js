import React, { Component } from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import Champion from "./Champion/Champion";
import "bootstrap/dist/css/bootstrap.min.css";
/**
 * Main Component containing logic for champion Dashboard
 */
class Champions extends Component {
  constructor(props) {
    super(props);
    state = {
      articles: [],
      searches: [],
      watchlist: [],
      page: 1,
      pageSize: 10,
      articleLength: 50,
      visibleArticles: [],
      searched: [],
      searchedText: "",
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      console.log(this.props.location.state);
      this.setState({
        articles: this.props.location.state.articles,
        searches: this.props.location.state.searches,
        watchlist: this.props.location.state.watchlist,
        page: this.props.location.state.page,
        pageSize: Number(this.props.location.state.pageSize),
        articleLength: this.props.location.state.articleLength,
        visibleArticles: this.props.location.state.visibleArticles,
        searched: this.props.location.state.searched,
        searchedText: this.props.location.state.searchedText,
      });
    } else {
      const defaultAPI =
        "https://api.pandascore.co/lol/champions?page[number]=&page[size]=&token=h1uX-wC3YOCMRJRUGQIXQ2y2vGwEnYlrKYPdrStNUnI01Ew63a4";
      fetch(defaultAPI)
        .then((response) => response.json())
        .then((data) =>
          this.setState({
            articles: data,
            visibleArticles: data.slice(this.state.page, this.state.pageSize),
            articleLength: data.length,
          })
        );
      console.log(this.state.articles);
    }
  }
  /**
   * Set number of champions per page
   *
   * @param {object} event
   */
  setPageSize = (event) => {
    var cropsArticles = this.state.articles.slice(0, event);
    this.setState({
      pageSize: event,
      visibleArticles: cropsArticles,
      page: 1,
    });
  };
  /**
   * Change champions Page
   *
   * @param {object} event Page Number
   */
  setPage = (event) => {
    this.setState({
      page: event,
    });
    var cropsArticles = this.state.articles;
    var pageSkip = (event - 1) * this.state.pageSize;
    var pageEndExpected = pageSkip + this.state.pageSize;
    var pageEnd =
      pageEndExpected > this.state.articleLength
        ? this.state.articleLength
        : pageSkip + this.state.pageSize;
    cropsArticles = cropsArticles.slice(pageSkip, pageEnd);
    this.setState({
      page: event,
      visibleArticles: cropsArticles,
    });
  };
  /**
   *Add Champion to Watchlist
   *
   * @param {Array} event Champion to add
   */
  addToWatchList = (event) => {
    this.state.watchlist.push(event);
    this.setState({
      pageSize: this.state.pageSize,
    });
  };
  /**
   *Remove Champion from Watchlist
   *
   * @param {Array} event Champion to remove from Watchlist
   */
  removeFromWatchlist = (event) => {
    this.setState({
      watchlist: this.state.watchlist.filter((e) => e.id !== event),
    });
  };
  /**
   * Open Watchlist
   */
  openWatchList = () => {
    this.props.history.push({
      pathname: "/ChampionWatchlist",
      state: { ...this.state },
    });
  };
  /**
   * Open First Page of Champions Dashboard
   */
  setFirstPage = () => {
    this.setState({
      page: 1,
    });
    this.setPage(1);
  };
  /**
   * Open Last Page of Champions Dashboard
   */
  setLastPage = () => {
    var divisions =
      this.state.articles.length % this.state.pageSize == 0
        ? this.state.articles.length / this.state.pageSize
        : Math.floor(this.state.articles.length / this.state.pageSize + 1);

    this.setState({
      page: divisions,
    });
    this.setPage(divisions);
  };
  /**
   * Compare by Ascending order
   * @param {string} key Element to be sorted
   * @returns function that shows if element is ascending or not
   */
  compareByAsc = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    };
  };
  /**
   * Compare by Descending order
   * @param {string} key Element to be sorted Descending
   * @returns function that shows if element is descending or not
   */
  compareByDesc = (key) => {
    return function (a, b) {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    };
  };
  /**
   *Sort by Ascending
   *
   * @param {string} key element to be sorted Ascending
   */
  sortByAsc = (key) => {
    var arrayCopy = this.state.visibleArticles;
    arrayCopy.sort(this.compareByAsc(key));
    this.setState({ articles: arrayCopy });
    console.log(this.state.articles);
  };
  /**
   *Sort by Descending
   *
   * @param {string} key element to be sorted Descending
   */
  sortByDesc = (key) => {
    var arrayCopy = this.state.visibleArticles;
    arrayCopy.sort(this.compareByDesc(key));
    this.setState({ articles: arrayCopy });
    console.log(this.state.articles);
  };
  /**
   *save searched text
   *
   * @param {string} event text typed for searching
   */
  searchEnter = (event) => {
    console.log(event);
    this.setState({
      searched: event,
    });
    var champ = this.state.articles.filter((c) =>
      c.name.toLowerCase().startsWith(event.toLowerCase())
    );
    this.setState({
      searchedText: event,
      searches: champ,
    });
    this.setState({
      visibleArticles: champ,
    });
    console.log(champ);
  };
  /**
   * show Champion details
   * @param {object} champion
   */
  openChampionDetails = (champion) => {
    console.log(champion);
    this.props.history.push({
      pathname: "/ChampionDetails",
      state: champion,
    });
  };
  render() {
    console.log(this.state);
    return (
      <div>
        {this.state.articles.length > 0 ? (
          <Champion
            allChampions={this.state.articles}
            champions={this.state.visibleArticles}
            setPageSize={this.setPageSize}
            page={this.state.page}
            pageSize={this.state.pageSize}
            setPage={this.setPage}
            addToWatchList={this.addToWatchList}
            removeFromWatchlist={this.removeFromWatchlist}
            watchlist={this.state.watchlist}
            openWatchlist={this.openWatchList}
            firstPage={this.setFirstPage}
            lastPage={this.setLastPage}
            sortDesc={this.sortByDesc}
            sortAsc={this.sortByAsc}
            searched={this.state.searched}
            onSearchEnter={this.searchEnter}
            searchedText={this.state.searchedText}
            openChampionDetails={this.openChampionDetails}
          ></Champion>
        ) : (
          <h1>Data is being fetched</h1>
        )}
      </div>
    );
  }
}

Champions.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default Champions;
