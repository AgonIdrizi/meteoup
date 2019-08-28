import React from "react";

import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import MainMenu from "./MainMenu";

afterEach(cleanup);

it("renders correctly based on input props", () => {
  const { container, rerender } = render(
    <BrowserRouter>
      <MainMenu loggedIn={false} />
    </BrowserRouter>
  );

  expect(container).toHaveTextContent("Login/Register");
  rerender(
    <BrowserRouter>
      <MainMenu loggedIn={true} />
    </BrowserRouter>
  );

  expect(container).toHaveTextContent("Logout");
});
