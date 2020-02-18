import React, { Component } from "react";

import './App.css';
import ReduxMovieList from "./ReduxMovieList";
import ReduxNewMovieForm from "./ReduxNewMovieForm";

class App extends Component {
    render() {
        return (
            <div className={'appWrapper'}>
                <div className={'newMovieWrapper'}>
                    <ReduxNewMovieForm/>
                </div>
                <div className={'moviesWrapper'}>
                    <ReduxMovieList/>
                </div>
            </div>
        );
    }
}

export default App;