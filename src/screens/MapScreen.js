import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigation from '../components/Navigation/Navigation';
import Map from '../components/Map/Map';

const styles = StyleSheet.create({
    contentBlock: {
        flex: 1
    },
});

class MapScreen extends Component {
    static navigationOptions = {
        headerTitle: <Text>Map location</Text>
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.contentBlock}>
                <Map/>
                <Navigation navigation={this.props.navigation}/>
            </View>
        )
    }
}

export default MapScreen;