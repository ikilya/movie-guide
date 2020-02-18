import React from 'react';
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import './NewMovieForm.css'

import TextInputField from "./formFields/TextInputField";
import SelectField from "./formFields/SelectField";

const NewMovieForm = (props) => {
    return (
        <div className='NewMovieFormWrapper'>
            <h1>Add movie</h1>
            <Formik
                initialValues = {{
                    title: '',
                    releaseYear: '',
                    movieFormat: '',
                    stars: ['']
                }}

                validationSchema = { Yup.object({
                    title: Yup.string()
                        .required("Required"),
                    releaseYear: Yup.number()
                        .typeError('Invalid year')
                        .max(2030, "Must be no more than 2030")
                        .min(1895, "Must be at least 1895")
                        .required("Required"),
                    movieFormat: Yup.string()
                        .required("Required"),
                    stars: Yup.array()
                        .of(
                            Yup.string().required("Required")
                        )
                })}

                onSubmit = {(values, { setSubmitting }) => {
                    setTimeout(() => {
                        props.setMovie(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                { ({values}) => (
                <Form>
                    <TextInputField
                        label='Title'
                        name='title'
                        type='text'
                    />
                    <TextInputField
                        label='Release year'
                        name='releaseYear'
                        type='text'
                    />
                    <SelectField label='Format' name='movieFormat'>
                        <option value=''>Select</option>
                        {props.movieFormats.map((movieFormat) => {
                            return (<option
                                key={movieFormat._id}
                                value = {movieFormat.movieFormat}>
                                {movieFormat.movieFormat.toUpperCase()}
                            </option>)
                        })}
                    </SelectField>

                    <FieldArray name = "stars">
                        {({ push, remove }) => (
                            <div>
                                {values.stars.map((starItem, index) => {
                                    return (
                                        <div key={index}>
                                            <TextInputField
                                                label="Actor"
                                                name={`stars[${index}]`}
                                            />
                                            <button
                                                className = 'button removeButton'
                                                type="button"
                                                onClick={() => remove(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    );
                                })}
                                <button
                                    className = 'button addButton'
                                    type = "button"
                                    onClick = {() => push('')}
                                >
                                    Add actor
                                </button>
                            </div>
                        )}
                    </FieldArray>

                    <button type='submit' className = 'button submitButton'>Add movie</button>
                </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewMovieForm;