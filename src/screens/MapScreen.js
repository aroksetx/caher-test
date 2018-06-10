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
      showEditWindow: true
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

class MapMarkerCreationWindow extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
    };
  }
  saveMarker = () => {
    console.log("Save Marker");
  };

  removeMarker = () => {
    console.log("Remove Marker");
  };

  render() {
    return (
      <View style={styles.newMarkerBlock}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type marker name!"
            onChangeText={name => this.setState({ name })}
          />
           <TextInput
            style={{ height: 40 }}
            placeholder="Type marker description!"
            onChangeText={description => this.setState({ description })}
          />
        </View>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <Button
            title="Save Marker"
            onPress={this.saveMarker}
            color="#841584"
            disabled={this.state.name.length === 0 || this.state.name.trim() === ''}
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            title="Decline Marker"
            color="red"
            onPress={this.removeMarker}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

export default MapScreen;
