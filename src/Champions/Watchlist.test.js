/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import { createMemoryHistory } from "history";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Watchlist from "./Watchlist";

const location = {
  hash: "",
  key: "7kdb4z",
  pathname: "/SubmitTest",
  search: "",
  state: {
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
  },
};

test("First Snapshot test", () => {
  const component = renderer.create(
    <Watchlist location={ location }/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

configure({ adapter: new Adapter() });

const history = createMemoryHistory();
history.push("/");
describe("Test Button component", () => {
  it("Test click event", () => {
    const historyMock = { push: jest.fn() };
    const shallowCopy = shallow(<Watchlist history={historyMock} location={location} />);
    shallowCopy.find("button").simulate("onClick");
    expect(history.location.pathname).toEqual("/");
  });
});