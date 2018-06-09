import React, { Component } from "react";
import { MapView, Components } from "expo";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";



const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {},
      listOfRegions: [],
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      markers: []
    };
  }

  setInitialRegion(initialRegion) {
    this.setState({ initialRegion });
  }

  pressIt(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor()
        }
      ]
    });
  }

  render() {
    const markers = this.state.markers.map(marker => (
      <Marker
        key={marker.key}
        coordinate={marker.coordinate}
        pinColor={marker.color}
      />
    ));

    return (
      <MapView
        style={styles.map}
        showsUserLocation
        provider={PROVIDER_GOOGLE}
        onPress={e => this.pressIt(e)}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }}
      >
        {/*<Marker*/}
        {/*coordinate={{ latitude: 37.78825,*/}
        {/*longitude: -122.4324}}*/}
        {/*title="234224"*/}
        {/*description="23423423423423"*/}
        {/*/>*/}
        {markers}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});
