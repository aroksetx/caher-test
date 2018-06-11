import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import Navigation from "../components/Navigation/Navigation";
import Map from "../components/Map/Map";
import MapMarkerCreationWindow from "../components/Map/MarkerDetailsView";
import { connect } from "react-redux";
import { locationsStateActions } from "../reducers/locations.reducer";
import { find, findIndex } from "lodash";

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

  addMarker(markerData) {
    console.log("Add new marker", markerData);
    const { dispatch } = this.props;
    dispatch({
      type: locationsStateActions.ADD_NEW_LOCATION,
      payloader: [markerData]
    });
    this.declineMarker();
  }

  removeMarker(markerData) {
    const { dispatch, locations } = this.props;
    const markerIndex = findIndex(locations.locations, {
      lat: markerData.lat,
      lng: markerData.lng
    });

    dispatch({
      type: locationsStateActions.REMOVE_LOCATION,
      payloader: {
        index: markerIndex
      }
    });
    this.declineMarker();
  }

  updateMarker(markerData) {
    const { dispatch, locations } = this.props;
    const markerIndex = findIndex(locations.locations, {
      lat: markerData.lat,
      lng: markerData.lng
    });
    dispatch({
      type: locationsStateActions.UPDATE_LOCATION,
      payloader: {
        marker: markerData,
        index: markerIndex
      }
    });
    this.declineMarker();
  }

  declineMarker() {
    const { dispatch } = this.props;
    dispatch({
      type: locationsStateActions.HIDE_MARKER_DETAIL_VIEW,
      payloader: {}
    });
  }

  toLatAndLog(coordinates) {
    return {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    };
  }

  render() {
    const { locations, dispatch } = this.props;
    const { isEdit, markerPoint, isNew } = locations;
    const marker = isNew
      ? this.toLatAndLog(markerPoint)
      : find(locations.locations, this.toLatAndLog(markerPoint));

    const editWindow = isEdit ? (
      <MapMarkerCreationWindow
        isNew={isNew}
        marker={marker}
        onAddMarker={this.addMarker.bind(this)}
        onRemoveMarker={this.removeMarker.bind(this)}
        onUpdateMarker={this.updateMarker.bind(this)}
        onDeclineMarker={this.declineMarker.bind(this)}
      />
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

const mapStateToProps = state => ({
  locations: state.locationsState
});
export default connect(mapStateToProps)(MapScreen);
