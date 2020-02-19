import React from 'react';
import { useFormik } from 'formik';

import './SearchForm.css'

const SearchForm = (props) => {
    const formik = useFormik({
        initialValues: {
            searchText: '',
            searchByActor: false
        },
        onSubmit: values => {
            props.doSearch(values);
        },
    });

    return (
            <form onSubmit={formik.handleSubmit} className='searchForm'>
                <input
                    id="searchText"
                    name="searchText"
                    type="search"
                    onChange={formik.handleChange}
                    value={formik.values.searchText}
                />
                <button type='submit' className = 'button searchButton'>Search</button>
                <input
                    id="searchByActor"
                    name="searchByActor"
                    type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.searchByActor}
                />
                <label htmlFor="searchByActor">search by actor</label>
            </form>
    );
};

export default SearchForm;