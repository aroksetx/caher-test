import React, { Component } from "react";
import { Text, ScrollView } from "react-native";
import LocationsListItem from "./LocationsListItem";

export default class LocationList extends Component {
  constructor() {
    super();
    this.state = {
      locations: [
        {
          city: "Los Angeles",
          coordinates: {
            latitude: 23.33,
            longitude: -42.22
          },
          notes: "Some notes"
        },
        {
          city: "Los Angeles",
          coordinates: {
            latitude: 23.33,
            longitude: -42.22
          },
          notes: "Some notes"
        }
      ]
    };
  }

  generateLocation(city, lat, lon, note) {
    return {
      city: city,
      coordinates: {
        latitude: lat,
        longitude: lon
      },
      notes: note
    };
  }

  render() {
    const locations = this.state.locations.map((location, index) => (
      <LocationsListItem
        key={location.city + index}
        title={location.city}
        coordinates={location.coordinates}
      />
    ));

    return <ScrollView>{locations}</ScrollView>;
  }
}
