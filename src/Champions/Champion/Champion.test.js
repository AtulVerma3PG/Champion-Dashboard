/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import Champion from "./Champion";

const historyMock = { push: jest.fn() };
configure({ adapter: new Adapter() });
test("Champion Snapshot test", () => {
  const component = renderer.create(
    <Champion
      allChampions={[]}
      champions={[]}
      setPageSize={historyMock}
      page="0"
      pageSize="10"
      setPage={historyMock}
      addToWatchList={historyMock}
      removeFromWatchlist={historyMock}
      watchlist={[]}
      openWatchlist={historyMock}
      firstPage={historyMock}
      lastPage={historyMock}
      sort={historyMock}
      onSearchEnter={historyMock}
      searchedText=""
      openChampionDetails={historyMock}
    />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});