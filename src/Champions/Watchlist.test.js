/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import { createMemoryHistory } from "history";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure, mount } from "enzyme";
import Watchlist from "./Watchlist";

const watchlist = [];

test("First Snapshot test", () => {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  const component = renderer.create(
    <Watchlist/>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  localStorage.removeItem("watchlist");
});

configure({ adapter: new Adapter() });
