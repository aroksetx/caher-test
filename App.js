import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AppLoading, Asset, Font, MapView } from "expo";
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AppNavigation from './src/AppNavigator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { middleware } from './src/utils/redux';
import AppReducer from './src/reducers';
import sortByDistance from 'sort-by-distance';
import logger from 'redux-logger';

const store = createStore(
  AppReducer,
  applyMiddleware(middleware, logger)
);

export default class App extends React.Component {
  constructor(){
    super();
    const points = [
      { x: 3, y: 5},
      { x: 80, y: 34},
      { x: 3, y: 7},
      { x: 22, y: 88},
      { x: 100, y: 60},
  ]
   
  const origin = { x: 50, y: 50}
   
  console.log(sortByDistance(origin, points))
    
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigation/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
