import React, { Component } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import Navigation from "../components/Navigation/Navigation";
import LocationList from "../components/LocationsList/LocationsList";
import Expo from "expo";

const styles = StyleSheet.create({
  contentBlock: {
    flex: 1,
    backgroundColor: Platform.OS === "ios" ? "#fff" : "rgb(83, 140, 204)",
    paddingTop: Expo.Constants.statusBarHeight
  },
  locationsContainer: {
    flex: 10,
    backgroundColor: "#fff"
  },
  navigarionContainer: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

class LocationsScreen extends Component {
  static navigationOptions = {
    headerTitle: <Text>Location list</Text>
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.contentBlock}>
        <View style={styles.locationsContainer}>
          <LocationList />
        </View>
        <View style={styles.navigarionContainer}>
          <Navigation navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

export default LocationsScreen;
