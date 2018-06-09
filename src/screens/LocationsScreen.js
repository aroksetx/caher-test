import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigation from '../components/Navigation/Navigation';
import LocationList from '../components/LocationsList/LocationsList';

const styles = StyleSheet.create({
    contentBlock: {
        flex: 1
    },
});


class LocationsScreen extends Component {
    static navigationOptions = {
        headerTitle: <Text>Location list</Text>
    };

    constructor(props){
        super(props);
    }

  render() {
    return (
        <View style={styles.contentBlock}>
        <LocationList/>
        <Navigation navigation={this.props.navigation}/>
      </View>
    )
  }
}

export default LocationsScreen;