import React from "react";

import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Login from "./Login";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<Login />);
  expect(asFragment()).toMatchSnapshot();
});

it("has disabled button for incorrect inputs", () => {
  const handleSubmit = jest.fn();
  const { getByText, getByTitle } = render(
    <Login loginHandler={handleSubmit()} />
  );

  const form = getByTitle("login-form");

  const emailNode = form.firstChild.lastElementChild;
  const passwordNode = form.childNodes[1];
  const button = form.lastElementChild;

  expect(button).toBeDisabled;

  emailNode.value = "as#as.";
  passwordNode.value = "1231w";

  expect(button).toBeDisabled;

  emailNode.value = "test@test.com";
  passwordNode.value = "1231wd";
  fireEvent.click(button);

  expect(handleSubmit).toHaveBeenCalled();
});
