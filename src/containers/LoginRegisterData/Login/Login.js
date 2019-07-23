import React from 'react';
import classes from './Login.module.scss';

class Login extends Component  {
    state = {
        loginForm : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value='',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your password'
                },
                value='',
                validation: {
                    required: true,
                    isPassword: true,
                    minLength: 4,
                    maxLength: 20,
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for( let formElementIdentifier in this.state.loginForm) {
            formData[formElementIdentifier] = this.state.formData[formElementIdentifier].value
        }
        //send data to backend
    }

    checkValidity (value, rules) {
        let isValid = true;

        if(!rules) { //for select elements
           return true
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] =updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) { //check if all inputs are valid in the form
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid});
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.loginForm) {
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
            <form onSubmit={this.loginHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <button btnType="Success" disabled={!this.state.formIsValid}>ORDER</button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }

      return (
        <div className={classes.Login}>
            Login data
            {form}
        </div>
      );
    }
}

export default Login;
