/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from 'enzyme';
import Champion from "./Champion";
import { createMemoryHistory } from "history";

const historyMock = { push: jest.fn() };
configure({adapter: new Adapter()});
test("Champion Snapshot test", () => {
  const component = renderer.create(
    <Champion
    allChampions= {[]}
    champions= {[]}
    setPageSize = {historyMock}
    page= "0"
    pageSize="10"
    setPage= {historyMock}
    addToWatchList={historyMock}
    removeFromWatchlist={historyMock}
    watchlist={[]}
    openWatchlist={historyMock}
    firstPage={historyMock}
    lastPage={historyMock}
    sortDesc={historyMock}
    sortAsc={historyMock}
    onSearchEnter={historyMock}
    searchedText=""
    openChampionDetails={historyMock} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


const history = createMemoryHistory();
history.push('/ChampionWatchlist');
describe('Test Button component', () => {
  it('Test click event', () => {
    const historyMock = { push: jest.fn() };
    const shallowCopy = shallow(<Champion history={historyMock} allChampions= {[]}
      champions= {[]}
      setPageSize = {historyMock}
      page= "0"
      pageSize="10"
      setPage= {historyMock}
      addToWatchList={historyMock}
      removeFromWatchlist={historyMock}
      watchlist={[]}
      openWatchlist={historyMock}
      firstPage={historyMock}
      lastPage={historyMock}
      sortDesc={historyMock}
      sortAsc={historyMock}
      onSearchEnter={historyMock}
      searchedText=""
      openChampionDetails={historyMock} />);
    shallowCopy.find("#openWatchlist").simulate("onClick");
    expect(history.location.pathname).toEqual('/ChampionWatchlist')
  });
});
