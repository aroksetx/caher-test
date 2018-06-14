import React, { Component } from 'react';
import { MapView, Components } from 'expo';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { getDeviceCurrentLocation } from '../../services/LocationsService';
import { LocationsStateActions } from '../../actions';
import { isEmpty } from 'lodash';

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
        const {dispatch} = this.props;
        getDeviceCurrentLocation().then(({coords}) => {
            dispatch({
                type: LocationsStateActions.SET_DEVICE_LAST_LOCATION,
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

    componentWillReceiveProps({locations}) {
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
        const {dispatch, locations} = this.props;
        const {coordinate} = event.nativeEvent;
        if(!locations.isEdit){
            dispatch({
                type: LocationsStateActions.SHOW_MARKER_DETAIL_VIEW,
                payloader: {
                    coordinate: coordinate,
                    isNew: true
                }
            });
        }
    }

    showMarkerInfo(event) {
        const {dispatch, locations} = this.props;
        const {coordinate} = event.nativeEvent;
        this.setState({
            initialRegion: {
                ...this.state.initialRegion,
                latitude: coordinate.latitude,
                longitude: coordinate.longitude
            }
        });
        dispatch({
            type: LocationsStateActions.SHOW_MARKER_DETAIL_VIEW,
            payloader: {
                coordinate: coordinate,
                isNew: false
            }
        });
    }

    render() {
        const markers = this.state.markers.map((marker, index) => (
            <Marker
                key={'marker' + index}
                onPress={e => this.showMarkerInfo(e)}
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
