import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input";
import { Button } from "antd";
import classes from "./Login.module.scss";

class Login extends Component {
  state = {
    loginForm: {
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
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    loading: false
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      //for select elements
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginForm = {
      ...this.state.loginForm
    };
    const updatedFormElement = {
      ...updatedLoginForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedLoginForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      //check if all inputs are valid in the form
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }
    let form = (
      <form title="login-form">
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            htmlFor={formElement.config.htmlFor}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          disabled={!this.state.formIsValid}
          onClick={e => this.props.loginHandler(e, this.state.loginForm)}
        >
          Login
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <p>Loading...</p>;
    }

    return <div className={classes.Login}>{form}</div>;
  }
}

export default Login;
