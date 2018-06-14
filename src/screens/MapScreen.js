import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View
} from 'react-native';
import Navigation from '../components/Navigation/Navigation';
import Map from '../components/Map/Map';
import MapMarkerCreationWindow from '../components/Map/MarkerDetailsView';
import { connect } from 'react-redux';
import { LocationsStateActions } from '../actions';
import { find, findIndex } from 'lodash';
import Expo from 'expo';
import DB from '../services/DataBaseService';
import config from '../config';

class MapScreen extends Component {
    constructor(props) {
        super(props);
        this.dataBase = new DB(config.dbName);
        this.state = {
            showEditWindow: false
        };
    }

    addMarker(markerData) {
        this.dataBase.addItem(markerData.name, markerData.description, markerData.lat, markerData.lng)
        const {dispatch} = this.props;
        dispatch({
            type: LocationsStateActions.ADD_NEW_LOCATION,
            payloader: [markerData]
        });
        this.declineMarker();
    }

    removeMarker(markerData) {
        const {dispatch, locations} = this.props;
        const markerIndex = findIndex(locations.locations, {
            lat: markerData.lat,
            lng: markerData.lng
        });

        dispatch({
            type: LocationsStateActions.REMOVE_LOCATION,
            payloader: {
                index: markerIndex
            }
        });
        this.declineMarker();
    }

    updateMarker(markerData) {
        const {dispatch, locations} = this.props;
        const markerIndex = findIndex(locations.locations, {
            lat: markerData.lat,
            lng: markerData.lng
        });
        dispatch({
            type: LocationsStateActions.UPDATE_LOCATION,
            payloader: {
                marker: markerData,
                index: markerIndex
            }
        });
        this.declineMarker();
    }

    declineMarker() {
        const {dispatch} = this.props;
        dispatch({
            type: LocationsStateActions.HIDE_MARKER_DETAIL_VIEW,
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
        const {locations, dispatch} = this.props;
        const {isEdit, markerPoint, isNew} = locations;
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
            <View style={styles.editBlock}/>
        );

        return (
            <View style={styles.contentBlock}>
                <Map/>
                {editWindow}
                <Navigation/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentBlock: {
        flex: 1,
        backgroundColor: Platform.OS === 'ios' ? '#fff' : 'rgb(83, 140, 204)',
        paddingTop: Expo.Constants.statusBarHeight
    },
    newMarkerBlock: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255,0.7)'
    },
    markerNameInput: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        padding: 15
    },
    editBlock: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        marginTop: Expo.Constants.statusBarHeight,
    }
});

const mapStateToProps = state => ({
    locations: state.locationsState
});
export default connect(mapStateToProps)(MapScreen);
