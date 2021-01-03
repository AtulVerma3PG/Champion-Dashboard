/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import { createMemoryHistory } from "history";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import ChampionDetail from "./ChampionDetail";

configure({ adapter: new Adapter() });
const location = {
  hash: "",
  key: "7kdb4z",
  pathname: "/SubmitTest",
  search: "",
  state: {
    articles: [

    ],
    searches: [

    ],
    watchlist: [

    ],
    searchedText: "",
    champion: [
      { videogame_versions: [10] },
    ],
    sortBy: "Asc",
  },
};
test("App Snapshot test", () => {
  const component = renderer.create(
    <ChampionDetail location={location} />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

const history = createMemoryHistory();
history.push("/");
describe("Test Button component", () => {
  it("Test click event", () => {
    const historyMock = { push: jest.fn() };
    const shallowCopy = shallow(<ChampionDetail history={historyMock} location={location} />);
    shallowCopy.find("button").simulate("onClick");
    expect(history.location.pathname).toEqual("/");
  });
});
