import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import LoginRegister from "./LoginRegister";

it("renders correct component on click", () => {
  const handleClearErrorMessages = jest.fn();

  const { getByTitle } = render(
    <LoginRegister clearErrorMessageHandler={handleClearErrorMessages} />
  );

  const selectComponentDiv = document.querySelector(".SelectComponent");
  const selectLoginAnchor = selectComponentDiv.firstElementChild;
  const selectRegisterAnchor = selectComponentDiv.lastElementChild;
  const loginForm = getByTitle("login-form");

  fireEvent.click(selectRegisterAnchor);

  const registerForm = getByTitle("register-form");

  expect(registerForm).toHaveTextContent("Register");

  fireEvent.click(selectLoginAnchor);

  expect(loginForm).toHaveTextContent("Login");
});
