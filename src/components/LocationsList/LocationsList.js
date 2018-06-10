import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import LocationsListItem from "./LocationsListItem";
import { connect } from "react-redux";
import sortByDistance from "sort-by-distance";

class LocationList extends Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };

    console.log('Location list constructor');
  }

  sortMarkersByDistance({ locations, deviceLocation }) {
    const { latitude, longitude } = deviceLocation;
    const devicePosition = { x: latitude, y: longitude };
    const formatedMarkers = locations.map(marker => {
      return {
        x: marker.lat,
        y: marker.lng,
        ...marker
      };
    });
    return sortByDistance(devicePosition, formatedMarkers);
  }

  componentWillReceiveProps({ locations }) {
    const sortedMarkersList = this.sortMarkersByDistance(locations);

    this.setState({
      markers: sortedMarkersList
    });
  }

  render() {
    const locations = this.state.markers.map((location, index) => (
      <LocationsListItem
        key={location.name + index}
        title={location.name}
        coordinates={{
          latitude: location.lat,
          longitude: location.lng
        }}
      />
    ));

    return <ScrollView>{locations}</ScrollView>;
  }
}

const mapStateToProps = state => ({
  locations: state.locationsState
});

export default connect(mapStateToProps)(LocationList);
