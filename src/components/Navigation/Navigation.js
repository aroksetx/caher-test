import React, { Component } from 'react';
import { View } from 'react-native';

import { connect } from 'react-redux';
import styles from './NavigationStyles';
import NavigationItem from './NavigationItem';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMap: true
        };
    }

    goToLocationsScreen() {
        const {dispatch} = this.props;
        dispatch({type: 'LocationScreen'});
    }

    goToMapScreen() {
        const {dispatch} = this.props;
        dispatch({type: 'MapScreen'});
    }

    render() {
        return (
            <View style={styles.navigationBlock}>
                <NavigationItem
                    action={this.goToMapScreen.bind(this)}
                    isActive={this.state.isMap}
                    title="Map"
                />
                <NavigationItem
                    action={this.goToLocationsScreen.bind(this)}
                    isActive={!this.state.isMap}
                    title="Locations"
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(Navigation);
