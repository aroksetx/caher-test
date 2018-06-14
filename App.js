import React from 'react';
import AppNavigation from './src/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware } from './src/utils/Redux';
import AppReducer from './src/reducers';
import logger from 'redux-logger';
import DB from './src/services/DataBaseService';
import { isNil, isEmpty } from 'lodash';
import { getDeviceCurrentLocation, getLocationsList } from './src/services/LocationsService';
import { LocationsStateActions } from './src/actions';
import config from './src/config';

const store = createStore(AppReducer, applyMiddleware(middleware, logger));

export default class App extends React.Component {
    constructor() {
        super();
        this.dataBase = new DB(config.dbName);
        this.dataBase.getItems().then(data => console.log(data));
    }

    componentDidMount() {
        getLocationsList().then(({locations}) => {
                this.saveResponseToDB(locations);
            }
        );

        this.dataBase.getItems().then(({_array}) => {
            store.dispatch({
                type: LocationsStateActions.ADD_NEW_LOCATION,
                payloader: _array
            });
        })
    }

    saveResponseToDB(locations) {
        if (!isNil(locations) && !isEmpty(locations)) {
            locations.forEach((location) => {
                const condition = {
                    'lat': location.lat,
                    'lng': location.lng
                };

                this.dataBase.isCoordinatesExist(condition).then(({_array}) => {
                    if (isEmpty(_array)) {
                        const {name, lat, lng} = location;
                        this.dataBase.addItem(name, '', lat, lng);
                    }
                });

            });
        }
    }


    render() {
        return (
            <Provider store={store}>
                <AppNavigation/>
            </Provider>
        );
    }
}
