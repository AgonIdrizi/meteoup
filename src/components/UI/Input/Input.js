import React from 'react'
import { Input } from 'antd';
import { Select } from 'antd';
import classes from './Input.module.scss'

const { TextArea } = Input;
const { Option } = Select;

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch ( props.elementType) {
        case ( 'input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                autocomplete="new-password"
                value={props.value}
                onChange={props.changed}/>
                
            break;
        case ( 'textarea' ):
            inputElement = <TextArea
                rows={4}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                autocomplete="new-password"
                value={props.value}
                onChange={props.changed}/>;
            break;
        case ( 'select' ):
            inputElement = (
                <Select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <Option key={option.value} value ={option.value}>
                            {option.displayValue}
                        </Option>
                    ))}
                </Select>
            );
            break;
        default:
            inputElement = <input
            className={inputClasses.join(' ')}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input