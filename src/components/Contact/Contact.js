import React, { Component } from 'react';
import Input from '../UI/Input/Input'
import { Button } from 'antd';
import classes from './Contact.module.scss';

class Contact extends Component {
    state = {
      contactForm:{
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'name',
            placeholder: 'Name',
            autocomplete: 'nope'
          },
          value:'',
          validation: {
            required: true,
            minLength: 2,
            maxLength: 20
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your email',
            autocomplete: 'nope'
          },
          value:'',
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        message: {
          elementType: 'textarea',
          elementConfig: {
            type: 'text',
            placeholder: 'Place your message here',
            autocomplete: 'nope'
          },
          value:'',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        }
      },
      formIsValid: false,
      loading: false
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

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedContactForm = {
          ...this.state.contactForm
        }

        const updatedFormElement = {
            ...updatedContactForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedContactForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedContactForm) { //check if all inputs are valid in the form

            formIsValid = updatedContactForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ contactForm:  updatedContactForm, formIsValid: formIsValid})
    }

    buttonClickHandler = (e) => {
      this.props.handleContactFormSubmit(e,this.state.contactForm.name.value , this.state.contactForm.email.value, this.state.contactForm.message.value)
    }

    render(){
      const formElementsArray = [];
      for (let key in this.state.contactForm){
        formElementsArray.push({
            id: key,
            config: this.state.contactForm[key]
        })
      }
      let form = <form>
                   {formElementsArray.map(formElement =>(
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
                   <Button type="primary" ghost disabled={!this.state.formIsValid} onClick={e => this.buttonClickHandler(e)}>Submit</Button>
                 </form>
      if ( this.state.loading ) {
        form = <p>Loading...</p>;
      }
    return (
        <div className={classes.Contact}>
            <h3>Send us a Message</h3>
            {form}
        </div>)
    }
}

export default Contact;