import React from "react";

import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Register from "./Register";

afterEach(cleanup);

it("renders correctly", () => {
  const { asFragment } = render(<Register />);
  expect(asFragment).toMatchSnapshot();
});

it("has disabled button for incorect inputs", () => {
  const handleSubmit = jest.fn();
  const { getByText, getByTitle } = render(
    <Register registerHandler={handleSubmit()} />
  );

  const form = getByTitle("register-form");

  const emailNode = form.childNodes[0];
  const passwordNode = form.childNodes[1];
  const confirmPasswordNode = form.childNodes[2];
  const button = form.childNodes[3];

  expect(button).toBeDisabled;

  emailNode.value = "sdfe$d.com";
  passwordNode.value = "sdsee1";

  expect(button).toBeDisabled;

  emailNode.value = "email@email.com";
  fireEvent.click(button);

  expect(handleSubmit).toHaveBeenCalled();
});
