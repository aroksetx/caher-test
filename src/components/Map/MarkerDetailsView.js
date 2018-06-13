import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { locationsStateActions } from "../../reducers/locations.reducer";
import { isNil } from 'lodash';

export default class MapMarkerCreationWindow extends Component {
  constructor(props) {
    super(props);
    const { marker, isNew } = this.props;

    this.state = {
      name: (isNil(isNew) || isNew) ? '' : marker.name,
      description: (isNil(isNew) || isNew)  ? '' : marker.description,
      lat: marker.lat,
      lng: marker.lng
    };
  }

  saveMarker = () => {
    const { onAddMarker } = this.props;
    onAddMarker(this.state);
  };

  updateMarker = () => {
    const { onUpdateMarker } = this.props;
    onUpdateMarker(this.state);
  };

  removeMarker = () => {
    const { onRemoveMarker, onDeclineMarker, isNew } = this.props;
    isNew ? onDeclineMarker() : onRemoveMarker(this.state);
  };

  render() {
    const { isNew } = this.props;
    const buttonTextConfig = {
      add: "Add marker",
      update: "Update marker",
      remove: "Remove marker",
      decline: "Decline marker"
    };
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
            title={isNew ? buttonTextConfig.add : buttonTextConfig.update}
            onPress={isNew ? this.saveMarker : this.updateMarker}
            color="#841584"
            disabled={
              this.state.name.length === 0 || this.state.name.trim() === ""
            }
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            title={isNew ? buttonTextConfig.decline : buttonTextConfig.remove}
            color="red"
            onPress={this.removeMarker}
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentBlock: {
    flex: 1,
  },
  newMarkerBlock: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255, 1)"
  },
  markerNameInput: {
    flex: 1,
    flexDirection: "row",
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    padding: 15
  }
});