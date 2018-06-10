import React, { Component } from "react";
import { MapView, Components } from "expo";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { connect } from "react-redux";
import {
  getLocationsList,
  getDeviceCurrentLocation
} from "../../services/LocationsService";
import { locationsStateActions } from "../../reducers/locations.reducer";
import { ViewPagerAndroid } from "react-native-gesture-handler";

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

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      },
      markers: []
    };
  }

  componentDidMount() {
    const { dispatch, locations } = this.props;

    getDeviceCurrentLocation().then(({ coords }) => {
      this.setState({
        initialRegion: {
          ...this.state.initialRegion,
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      });
    });

    getLocationsList().then(({ locations }) =>
      dispatch({
        type: locationsStateActions.ADD_NEW_LOCATION,
        payloader: locations
      })
    );
  }

  componentWillReceiveProps({ locations }) {
    const coordinates = this.formatLocationData(locations.locations);

    this.setState({
      markers: [...this.state.markers, ...coordinates]
    });
  }

  formatLocationData(locationList) {
    return locationList.map(location => {
      return {
        name: location.name,
        coordinate: {
          latitude: location.lat,
          longitude: location.lng
        }
      };
    });
  }

  pressIt(e) {
    console.log(e.nativeEvent.coordinate)
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
    const markers = this.state.markers.map((marker, index) => (
      <Marker
        key={"marker" + index}
        title={marker.name}
        description={"*"}
        coordinate={marker.coordinate}
      />
    ));

    return (
      <MapView
        style={styles.map}
        showsUserLocation
        cacheEnabled={true}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
        onPress={e => this.pressIt(e)}
        region={this.state.initialRegion}
      >
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

const mapStateToProps = state => ({
  locations: state.locationsState
});

export default connect(mapStateToProps)(Map);
