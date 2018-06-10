import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Navigation from "../components/Navigation/Navigation";
import Map from "../components/Map/Map";

class MapScreen extends Component {
  static navigationOptions = {
    headerTitle: <Text>Map location</Text>
  };

  constructor(props) {
    super(props);
    this.state = {
      showEditWindow: false
    };
  }

  addNewMapMarker() {}
  render() {
    const editWindow = this.state.showEditWindow ? (
      <MapMarkerCreationWindow />
    ) : (
      ""
    );

    return (
      <View style={styles.contentBlock}>
        <Map />
        {editWindow}
        <Navigation navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentBlock: {
    flex: 1
  },
  newMarkerBlock: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.7)"
  },
  markerNameInput: {
    flex: 1,
    flexDirection: "row",
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    padding: 15
  }
});

const MapMarkerCreationWindow = props => {
  return (
    <View style={styles.newMarkerBlock}>
      <View style={{ flex: 1 }}>
        <TextInput style={styles.markerNameInput} placeholder="Marker name" />
        <TextInput
          style={styles.markerNameInput}
          placeholder="Marker description"
        />
      </View>
      <View style={{ flex: 2, flexDirection: "row" }}>
        <Button
          title="Save Marker"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          title="Decline Marker"
          color="red"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

export default MapScreen;
