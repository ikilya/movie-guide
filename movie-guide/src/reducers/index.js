import { combineReducers } from 'redux';

import movieReducer from './movieReducer';

const reducers = combineReducers({
    movieState: movieReducer
});

export default reducers;