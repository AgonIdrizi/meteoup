import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input";
import { Button } from "antd";
import classes from "./Register.module.scss";

class Register extends Component {
  state = {
    registerForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
          autocomplete: "nope"
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
          placeholder: "Password"
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
      },
      passwordConfirmation: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password confirmation"
        },
        value: "",
        validation: {
          required: true,
          isPasswordConfirmation: true,
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

    if (rules.isPasswordConfirmation) {
      isValid = value === this.state.registerForm.password.value;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedRegisterForm = {
      ...this.state.registerForm
    };
    const updatedFormElement = {
      ...updatedRegisterForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedRegisterForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;

    for (let inputIdentifier in updatedRegisterForm) {
      //check if all inputs are valid in the form
      formIsValid = updatedRegisterForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      registerForm: updatedRegisterForm,
      formIsValid: formIsValid
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.registerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registerForm[key]
      });
    }

    let form = (
      <form title="register-form">
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          disabled={!this.state.formIsValid}
          onClick={e => this.props.signUpHandler(e, this.state.registerForm)}
        >
          Register
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <p>Loading...</p>;
    }
    return <div className={classes.Register}>{form}</div>;
  }
}

export default Register;
