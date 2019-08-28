import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  LoginRegisterContext,
  LoginRegisterProvider
} from "../contexts/LoginRegisterContext";
import axiosMock from "../../src/__mocks__/axios";
import App from "../../src/App";
import { location, current, forecast } from "../data/apixuForecastData";
import { openweather } from "../data/openWeatherData";

const apixuData = {
  data: {
    location: { ...location },
    current: { ...current },
    forecast: { ...forecast }
  }
};
const openweatherData = {
  data: { ...openweather }
};

it("renders", () => {
  // axiosMock.get.mockResolvedValueOnce([apixuData, openweatherData]);
  // const { container, getByTestId } = render(
  //   <LoginRegisterProvider>
  //     <LoginRegisterContext.Consumer>
  //       {({ authListener, user, loggedIn }) => (
  //         <App user={user} loggedIn={loggedIn} authListener={authListener} />
  //       )}
  //     </LoginRegisterContext.Consumer>
  //   </LoginRegisterProvider>
  // );
  // console.log(axiosMock)
});
