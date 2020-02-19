import React, { Component } from "react";

import './App.css';
import ReduxMovieList from "./ReduxMovieList";
import ReduxNewMovieForm from "./ReduxNewMovieForm";
import ReduxSearchForm from "./ReduxSearchForm";

class App extends Component {
    render() {
        return (
            <div className={'appWrapper'}>
                <div className={'newMovieWrapper'}>
                    <ReduxNewMovieForm/>
                </div>
                <div className={'moviesWrapper'}>
                    <ReduxSearchForm/>
                    <ReduxMovieList/>
                </div>
            </div>
        );
    }
}

export default App;