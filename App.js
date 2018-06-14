import React from 'react';
import AppNavigation from './src/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { middleware } from './src/utils/Redux';
import AppReducer from './src/reducers';
import logger from 'redux-logger';
import DB from './src/services/DataBaseService';
import { isNil, isEmpty, filter } from 'lodash';
import { getLocationsList } from './src/services/LocationsService';
import { LocationsStateActions } from './src/actions';

const store = createStore(AppReducer, applyMiddleware(middleware, logger));

export default class App extends React.Component {
    constructor() {
        super();
        this.dataBase = new DB('testLocation-0.1');
    }

    componentDidMount() {
        getLocationsList().then(({locations}) => {
                store.dispatch({
                    type: LocationsStateActions.ADD_NEW_LOCATION,
                    payloader: locations
                });
                this.saveResponseToDB(locations);
            }
        );
    }

    saveResponseToDB(locations) {
        if (!isNil(locations) && !isEmpty(locations)) {
            this.dataBase.getItems().then(({_array}) => {
                if (!isNil(_array)) {
                    locations.forEach((location) => {
                        const condition = {
                            'lat': location.lat,
                            'lng': location.lng
                        };
                        const filteredData = filter(_array, condition);

                        if (!isNil(filteredData) && isEmpty(filteredData)) {
                            const {name, lat, lng} = location;
                            this.dataBase.addItem(name, '', lat, lng);
                        }
                    });
                }
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
