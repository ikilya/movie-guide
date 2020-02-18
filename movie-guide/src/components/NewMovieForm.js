import React from 'react';
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";

import './NewMovieForm.css'

import TextInputField from "./formFields/TextInputField";
import SelectField from "./formFields/SelectField";

const NewMovieForm = () => {
    return (
        <div className='NewMovieFormWrapper'>
            <h1>Add movie</h1>
            <Formik
                initialValues = {{
                    title: '',
                    releaseYear: '',
                    movieFormat: '',
                    stars: ['star1', 'star2']
                }}

                validationSchema = { Yup.object({
                    title: Yup.string()
                        .required("Required"),
                    releaseYear: Yup.number()
                        .typeError('Must be a number')
                        .max(2030, "Must be no more than 2030")
                        .min(1895, "Must be at least 1895")
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
                        <option value='vhs'>VHS</option>
                        <option value='dvd'>DVD</option>
                        <option value='blu-ray'>Blu-ray</option>
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
                                                type="button"
                                                onClick={() => remove(index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    );
                                })}
                                <button
                                    className = 'button'
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