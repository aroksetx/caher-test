import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { connect } from "react-redux";
import { locationsStateActions } from "../../reducers/locations.reducer";

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

export default class MapMarkerCreationWindow extends Component {
  constructor(props) {
    super(props);
    const { marker, isNew } = this.props;
    
    this.state = {
      name: isNew ? '' : marker.name,
      description: isNew ? '' : marker.description,
      lat: marker.lat,
      lng: marker.lng
    };
  }

  saveMarker = () => {
    const { onAddMarker } = this.props;
    onAddMarker(this.state);
  };

  removeMarker = () => {
    const { onRemoveMarker, onDeclineMarker, isNew } = this.props;
    isNew ? onDeclineMarker() : onRemoveMarker(this.state);
  };

  render() {
    return (
      <View style={styles.newMarkerBlock}>
        <View style={{ flex: 1 }}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type marker name!"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Type marker description!"
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
        </View>
        <View style={{ flex: 2, flexDirection: "row" }}>
          <Button
            title="Save Marker"
            onPress={this.saveMarker}
            color="#841584"
            disabled={
              this.state.name.length === 0 || this.state.name.trim() === ""
            }
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
