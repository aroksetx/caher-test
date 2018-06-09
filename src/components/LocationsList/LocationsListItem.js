import React, { Component } from 'react'
import { Text, View, TouchableOpacity} from 'react-native'
import styles from './LocationListStyle'

export default class LocationsListItem extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <View style={styles.locationsContainer} >
            <TouchableOpacity >
                <Text style={styles.locationItemTitle}>{this.props.title} </Text>
                    <View style={styles.locationItemDescription}>
                        <Text style={styles.locationDescriptionItem}>Latitude: {this.props.coordinates.latitude}</Text>
                        <Text style={styles.locationDescriptionItem}>Longitude: {this.props.coordinates.longitude}</Text>
                    </View>
            </TouchableOpacity>
            </View>
        )
    }
}