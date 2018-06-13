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
import { getDeviceCurrentLocation } from "../../services/LocationsService";
import { locationsStateActions } from "../../reducers/Locations.reducer";
import { ViewPagerAndroid } from "react-native-gesture-handler";
import { isEmpty } from "lodash";

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
      dispatch({
        type: locationsStateActions.SET_DEVICE_LAST_LOCATION,
        payloader: coords
      });
      this.setState({
        initialRegion: {
          ...this.state.initialRegion,
          latitude: coords.latitude,
          longitude: coords.longitude
        }
      });
    });
  }

  componentWillUpdate(){
    // const { locations } = this.props;
    // const { isNew, markerPoint } = locations;
    // console.log('Llalalal')
    // console.log(isEmpty(markerPoint))
    // console.log(markerPoint)
    //   if (!isEmpty(markerPoint)) {
    //   console.log(this.state.initialRegion)
    //   this.setState({
    //     initialRegion: {
    //       ...this.state.initialRegion,
    //       markerPoint
    //     }
    //   });
    //   console.log(this.state.initialRegion)
    // }
  }

  componentWillReceiveProps({ locations }) {
    const coordinates = this.formatLocationData(locations.locations);
    this.setState({
      markers: coordinates
    });
  }

  formatLocationData(locationList) {
    return locationList.map(location => {
      return {
        name: location.name,
        description: location.description,
        coordinate: {
          latitude: location.lat,
          longitude: location.lng
        }
      };
    });
  }

  addNewMarker(event) {
    const { dispatch } = this.props;
    const { coordinate } = event.nativeEvent;
    const { latitude, longitude } = event.nativeEvent.coordinate;
    dispatch({
      type: locationsStateActions.SHOW_MARKER_DETAIL_VIEW,
      payloader: {
        coordinate: coordinate,
        isNew: true
      }
    });
  }

  getMarkerInfo(event) {
    const { dispatch } = this.props;
    const { coordinate } = event.nativeEvent;

    dispatch({
      type: locationsStateActions.SHOW_MARKER_DETAIL_VIEW,
      payloader: {
        coordinate: coordinate,
        isNew: false
      }
    });
  }

  render() {
    const { locations } = this.props;
    const { isNew, isEdit, markerPoint } = locations;

    const markers = this.state.markers.map((marker, index) => (
      <Marker
        key={"marker" + index}
        title={marker.name}
        description={marker.description}
        onPress={e => this.getMarkerInfo(e)}
        coordinate={marker.coordinate}
      />
    ));

    return (
      <MapView
        style={styles.map}
        showsUserLocation
        cacheEnabled={true}
        onLongPress={e => this.addNewMarker(e)}
        followsUserLocation={true}
        provider={PROVIDER_GOOGLE}
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
