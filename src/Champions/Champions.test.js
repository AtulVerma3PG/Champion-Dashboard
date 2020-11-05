/* eslint-disable */
import React from "react";
import renderer from "react-test-renderer";
import Champions from "./Champions";

test("Champions Snapshot test", () => {
  const component = renderer.create(
    <Champions />,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

