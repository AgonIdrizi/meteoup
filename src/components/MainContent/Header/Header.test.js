import React from "react";

import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./Header";
import { location, current } from "../../../data/apixuForecastData";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = render(
    <Header location={location} current={current} />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("inserts text in h1", () => {
  const { getByTestId, getByText } = render(
    <Header location={location} current={current} />
  );
  expect(getByTestId("h1tag")).toHaveTextContent("Weather in Tetovo");
});

it("displays temp", () => {
  const { container } = render(
    <Header location={location} current={current} />
  );
  const headerElem = container.getElementsByClassName("headerImage");
  expect(headerElem[0]).toHaveTextContent("31 °C");
});
