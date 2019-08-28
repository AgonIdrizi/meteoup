import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import OneDayForecast from "./OneDayForecast";
import { forecast } from "../../../../data/apixuForecastData";

afterEach(cleanup);

const [day1, day2] = forecast["forecastday"];

it("renders correctly", () => {
  const { asFragment } = render(<OneDayForecast data={day1} />);

  expect(asFragment()).toMatchSnapshot();
});

it("has correct weather data", () => {
  const { container, rerender } = render(<OneDayForecast data={day1} />);

  const dateDiv = container.querySelector(".Date");

  expect(dateDiv).toHaveTextContent("6/26");
  expect(dateDiv).toHaveTextContent("Wed");

  rerender(<OneDayForecast data={day2} />);

  expect(dateDiv).toHaveTextContent("6/27");
  expect(dateDiv).toHaveTextContent("Thu");
});
