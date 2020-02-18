import React, { Component } from "react";

import './App.css';
import ReduxMovieList from "./ReduxMovieList";
import NewMovieForm from "./NewMovieForm";

class App extends Component {
    render() {
        return (
            <div>
                <div className={'newMovieWrapper'}>
                    <NewMovieForm/>
                </div>
                <div className={'moviesWrapper'}>
                    <ReduxMovieList/>
                </div>
            </div>
        );
    }
}

export default App;