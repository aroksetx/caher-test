import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { AppLoading, Asset, Font, MapView } from "expo";
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AppNavigator from './src/AppNavigator';

import Map from "./src/components/Map/Map";

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator/>
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
