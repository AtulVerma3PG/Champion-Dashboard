import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Champion from "./Champion/Champion";

const initialState = {
  articles: [],
  searches: [],
  watchlist: [],
  page: 1,
  pageSize: 10,
  articleLength: 50,
  visibleArticles: [],
  searchedText: "",
  champion: [],
  sortBy: "Asc",
};
/**
 * Main Component containing logic for champion Dashboard
 */
class Champions extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("state"))
      ? JSON.parse(localStorage.getItem("state"))
      : initialState;
    const { articles } = this.state;
    if (articles.length === 0) {
      const defaultAPI = "https://api.pandascore.co/lol/champions?page[number]=&page[size]=&token=h1uX-wC3YOCMRJRUGQIXQ2y2vGwEnYlrKYPdrStNUnI01Ew63a4";
      const { pageSize } = this.state;
      fetch(defaultAPI)
        .then((response) => response.json())
        .then((data) => this.setState({
          articles: data,
          visibleArticles: data.slice(0, pageSize),
          articleLength: data.length,
        }));
      localStorage.clear();
    } else {
      const { page } = this.state;
      this.setPage(page);
    }
  }

  /**
   * Set number of champions per page
   *
   * @param {object} event
   */
  setPageSize = (event) => {
    const { articles } = this.state;
    const cropsArticles = articles.slice(0, event);
    this.setState({
      pageSize: event,
      visibleArticles: cropsArticles,
      page: 1,
    });
    this.updateLocalStorage();
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
    let { articles } = this.state;
    const { pageSize } = this.state;
    const { articleLength } = this.state;
    const pageSkip = (event - 1) * pageSize;
    const pageEndExpected = pageSkip + pageSize;
    const pageEnd = pageEndExpected > articleLength
      ? articleLength
      : pageSkip + pageSize;
    articles = articles.slice(pageSkip, pageEnd);
    this.setState({
      page: event,
      visibleArticles: articles,
      searchedText: "",
    }, () => this.updateLocalStorage());
  };

  /**
   *Add Champion to Watchlist
   *
   * @param {Array} event Champion to add
   */
  addToWatchList = (event) => {
    const { watchlist } = this.state;
    watchlist.push(event);
    this.setState({
      watchlist,
      searchedText: "",
    });
    this.updateLocalStorage();
  };

  /**
   *Remove Champion from Watchlist
   *
   * @param {Array} event Champion to remove from Watchlist
   */
  removeFromWatchlist = (event) => {
    const { watchlist } = this.state;
    this.setState({
      watchlist: watchlist.filter((e) => e.id !== event),
    });
    this.updateLocalStorage();
  };

  /**
   * Open Watchlist
   */
  openWatchList = () => {
    const { history } = this.props;
    history.push({
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
    this.updateLocalStorage();
    this.setPage(1);
  };

  /**
   * Open Last Page of Champions Dashboard
   */
  setLastPage = () => {
    const { articles } = this.state;
    const { pageSize } = this.state;
    const divisions = articles.length % pageSize == 0
      ? articles.length / pageSize
      : Math.floor(articles.length / pageSize + 1);

    this.setState({
      page: divisions,
    });
    this.updateLocalStorage();
    this.setPage(divisions);
  };

  /**
   * Compare by Ascending order
   * @param {string} key Element to be sorted
   * @returns function that shows if element is ascending or not
   */
  compareByAsc = (key) => (a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  };

  /**
   * Compare by Descending order
   * @param {string} key Element to be sorted Descending
   * @returns function that shows if element is descending or not
   */
  compareByDesc = (key) => (a, b) => {
    if (a[key] > b[key]) {
      return -1;
    }
    if (a[key] < b[key]) {
      return 1;
    }
    return 0;
  };

  /**
   *Sort by Ascending
   *
   * @param {string} key element to be sorted Ascending
   */
  sortByAsc = (key) => {
    const { visibleArticles } = this.state;
    const arrayCopy = visibleArticles;
    arrayCopy.sort(this.compareByAsc(key));
    this.setState({ visibleArticles: arrayCopy });
    this.updateLocalStorage();
  };

  /**
   *Sort by Descending
   *
   * @param {string} key element to be sorted Descending
   */
  sortByDesc = (key) => {
    const { visibleArticles } = this.state;
    visibleArticles.sort(this.compareByDesc(key));
    this.setState({ visibleArticles });
    this.updateLocalStorage();
  };

  sort = (key) => {
    const { visibleArticles } = this.state;
    visibleArticles.sort(this.compareByDesc(key));
    this.setState({ visibleArticles });
    this.updateLocalStorage();
  };

  /**
   *save searched text
   *
   * @param {string} event text typed for searching
   */
  searchEnter = (event) => {
    const { articles, page } = this.state;
    if (event !== "") {
      const champ = articles.filter((c) => c.name.toLowerCase().startsWith(event.toLowerCase()));
      this.setState({
        searchedText: event,
        searches: champ,
        visibleArticles: champ,
      });
      // this.setState({
      //   visibleArticles: champ,
      // });
    } else {
      this.setState({
        searchedText: "",
        searches: [],
      });
      this.setPage(page);
    }
    this.updateLocalStorage();
  };

  /**
   * show Champion details
   * @param {object} champion
   */
  openChampionDetails = (champion) => {
    const { history } = this.props;
    this.setState({
      champion,
    }, () => {
      this.updateLocalStorage();
      history.push({
        pathname: "/ChampionDetails",
      });
    });
  };

  /**
   * Update Local storage on state change
   */
  updateLocalStorage() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  render() {
    const {
      articles, visibleArticles, page, pageSize, watchlist, searchedText,
    } = this.state;
    return (
      <div>
        {articles.length > 0 ? (
          <Champion
            allChampions={articles}
            champions={visibleArticles}
            setPageSize={this.setPageSize}
            page={page}
            pageSize={pageSize}
            setPage={this.setPage}
            addToWatchList={this.addToWatchList}
            removeFromWatchlist={this.removeFromWatchlist}
            watchlist={watchlist}
            openWatchlist={this.openWatchList}
            firstPage={this.setFirstPage}
            lastPage={this.setLastPage}
            sortDesc={this.sortByDesc}
            sortAsc={this.sortByAsc}
            onSearchEnter={this.searchEnter}
            searchedText={searchedText}
            openChampionDetails={this.openChampionDetails}
          />
        ) : (
          <h1>Data is being fetched</h1>
        )}
      </div>
    );
  }
}

Champions.propTypes = {
  history: Object.isRequired,
};
export default Champions;
