import React from "react";

import {
  render,
  cleanup,
  fireEvent,
  wait,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SevenDayForecast from "./SevenDayForecast";
import { forecast } from "../../../data/apixuForecastData";

afterEach(cleanup);

let lastSelectedDay = 0;

const clickOneDayForecastHandler = jest.fn()

it("renders succesfully", () => {
  const { asFragment } = render(
    <SevenDayForecast
      lastSelectedDay={lastSelectedDay}
      clicked={clickOneDayForecastHandler}
      forecast={forecast}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("has correct color and width for a selected day", async () => {
  const { container, getByTestId, rerender } = render(
    <SevenDayForecast
      lastSelectedDay={lastSelectedDay}
      clicked={clickOneDayForecastHandler}
      forecast={forecast}
    />
  );
  const sevenDayForecastDiv = await waitForElement(() =>
    getByTestId("sevenDayForecast")
  );

  const oneDayForecastFirstDiv = sevenDayForecastDiv.firstChild;
  const oneDayForecastLastDiv = sevenDayForecastDiv.lastChild;

  expect(sevenDayForecastDiv.childNodes.length).toEqual(7);
  expect(oneDayForecastFirstDiv.style.backgroundColor).toBe("white");
  expect(oneDayForecastFirstDiv.style.width).toBe("105%");

  //re-render with different selectedDay
  rerender(
    <SevenDayForecast
      lastSelectedDay={6}
      clicked={clickOneDayForecastHandler}
      forecast={forecast}
    />
  );

  expect(oneDayForecastLastDiv.style.backgroundColor).toBe("white");
  expect(oneDayForecastLastDiv.style.width).toBe("105%");

  expect(oneDayForecastFirstDiv.style.width).toEqual("100%");
});
