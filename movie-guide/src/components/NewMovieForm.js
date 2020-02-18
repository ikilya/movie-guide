import React from 'react';
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

/*const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    }

    if (!values.releaseYear) {
        errors.releaseYear = 'Required';
    } else {
        const releaseYear = Number(values.releaseYear);
        if (Number.isNaN(releaseYear)) {
            errors.releaseYear = 'Invalid year';
        } else if (releaseYear < 1895 || releaseYear > 2030) {
            errors.releaseYear = 'Set the year between 1895 and 2030';
        }
    }

    return errors;
};*/

const NewMovieForm = () => {
    return (
        <>
            <h1>Add movie</h1>
            <Formik
                initialValues = {{
                    title: '',
                    releaseYear: '',
                    movieFormat: '',
                    stars: []
                }}
                validationSchema = { Yup.object({
                    title: Yup.string()
                        .required("Required"),
                    releaseYear: Yup.number()
                        .max(2030, "Must be no more than 2030")
                        .required("Required"),
                    movieFormat: Yup.string()
                        .required("Required")
                })}
                onSubmit = {(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    <MyTextInput
                        label = 'Title'
                        name = 'title'
                        type = 'text'
                    />
                    <MyTextInput
                        label = 'Release year'
                        name = 'releaseYear'
                        type = 'text'
                    />
                    <MySelect label = 'Format' name = 'movieFormat'>
                        <option value = 'vhs'>VHS</option>
                        <option value = 'dvd'>DVD</option>
                        <option value = 'blu-ray'>Blu-ray</option>
                    </MySelect>
                    <MyTextInput
                        label = 'Actor'
                        name = 'actor'
                        type = 'text'
                    />
                    <button type = 'button'>Add actor</button>
                    <button type = 'submit'>Add movie</button>
                </Form>
            </Formik>
        </>
    );
};

export default NewMovieForm;