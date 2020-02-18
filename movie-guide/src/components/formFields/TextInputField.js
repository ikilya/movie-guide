import React from 'react';
import {useField} from "formik";

import './formFields.css';

const TextInputField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="fieldError">{meta.error}</div>
            ) : null}
        </>
    );
};

export default TextInputField;