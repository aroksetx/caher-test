import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import LocationsListItem from './LocationsListItem';
import { connect } from 'react-redux';
import sortByDistance from 'sort-by-distance';
import { NavigationStateActions } from '../../actions';

class LocationList extends Component {
    constructor() {
        super();
        this.state = {
            markers: []
        };
    }

    sortMarkersByDistance({locations, deviceLocation}) {
        const {latitude, longitude} = deviceLocation;
        const devicePosition = {x: latitude, y: longitude};
        const formatedMarkers = locations.map(marker => {
            return {
                x: marker.lat,
                y: marker.lng,
                ...marker
            };
        });
        return sortByDistance(devicePosition, formatedMarkers);
    }

    componentWillReceiveProps({locations}) {
        const sortedMarkersList = this.sortMarkersByDistance(locations);

        this.setState({
            markers: sortedMarkersList
        });
    }

    showMarkerDetails(data) {
        const {dispatch} = this.props;
        dispatch({type: NavigationStateActions.GO_TO_MAP, payloader: data});
    }

    render() {
        const locations = this.state.markers.map((location, index) => (
            <LocationsListItem
                key={location.name + index}
                title={location.name}
                pressAction={this.showMarkerDetails.bind(this)}
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
    locations: state.locationsState,
    nav: state.nav
});

export default connect(mapStateToProps)(LocationList);
