import React from "react";

import './App.css';
import ReduxMovieList from "./ReduxMovieList";
import ReduxNewMovieForm from "./ReduxNewMovieForm";
import ReduxSearchForm from "./ReduxSearchForm";
import ReduxFileInput from "./ReduxFileInput";

function App () {
    return (
        <div className={'appWrapper'}>
            <div className={'newMovieWrapper'}>
                <ReduxNewMovieForm/>
                <ReduxFileInput/>
            </div>
            <div className={'moviesWrapper'}>
                <ReduxSearchForm/>
                <ReduxMovieList/>
            </div>
        </div>
    );
}

export default App;