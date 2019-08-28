import React from "react";

import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Input from "./Input";

const inputTypes = {
  email: {
    elementType: "input",
    elementConfig: {
      type: "email",
      placeholder: "Your Email",
      autocomplete: "nope",
      htmlFor: "email-input"
    },
    value: "",
    validation: {
      required: true,
      isEmail: true
    },
    valid: false,
    touched: false
  },
  password: {
    elementType: "input",
    elementConfig: {
      type: "password",
      placeholder: "Your password",
      htmlFor: "password-input"
    },
    value: "",
    validation: {
      required: true,
      isPassword: true,
      minLength: 4,
      maxLength: 20
    }
  }
};

it("renders correctly", () => {
  const changeHandler = jest.fn();

  const { container, rerender, getByPlaceholderText } = render(
    <Input
      elementType={inputTypes.email.elementType}
      elementConfig={inputTypes.email.elementConfig}
      value={inputTypes.email.value}
      invalid={!inputTypes.email.valid}
      shouldValidate={inputTypes.email.validation}
      touched={inputTypes.email.touched}
      htmlFor={inputTypes.email.htmlFor}
      changed={changeHandler}
    />
  );

  const emailInput = getByPlaceholderText("Your Email");

  expect(emailInput).toBeInTheDOM;

  rerender(
    <Input
      elementType={inputTypes.password.elementType}
      elementConfig={inputTypes.password.elementConfig}
      value={inputTypes.password.value}
      invalid={!inputTypes.password.valid}
      shouldValidate={inputTypes.password.validation}
      touched={inputTypes.password.touched}
      htmlFor={inputTypes.password.htmlFor}
      changed={changeHandler}
    />
  );
  const passwordInput = getByPlaceholderText("Your password");
  expect(emailInput).not.toBeInTheDOM;
  expect(passwordInput).toBeInTheDOM;
});
