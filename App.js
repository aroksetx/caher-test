import React from 'react';
import AppNavigation from './src/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware } from './src/utils/Redux';
import AppReducer from './src/reducers';
import logger from 'redux-logger';
import DB from './src/services/DataBaseService';

import { getLocationsList } from './src/services/LocationsService';
import { locationsStateActions } from './src/reducers/Locations.reducer';

const store = createStore(AppReducer, applyMiddleware(middleware, logger));

export default class App extends React.Component {
    constructor() {
        super();
        const dataBase = new DB('testLocations');
    }

    componentDidMount() {
        getLocationsList().then(({locations}) =>
            store.dispatch({
                type: locationsStateActions.ADD_NEW_LOCATION,
                payloader: locations
            })
        );
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigation/>
            </Provider>
        );
    }
}
