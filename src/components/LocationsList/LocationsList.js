import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import LocationsListItem from "./LocationsListItem";
import { connect } from "react-redux";

class LocationList extends Component {
  constructor() {
    super();
    this.state = {
      markers: []
    };
  }

  componentWillReceiveProps({ locations }) {
    this.setState({
      markers: locations.locations
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
