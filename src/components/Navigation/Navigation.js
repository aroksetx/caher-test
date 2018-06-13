import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./NavigationStyles";
import NavigationItem from "./NavigationItem";

const mapStateToProps = state => ({
  isLoggedIn: 'asdasdasdas'
});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMap: true
    };
  }

  goToLocationsScreen() {
    this.props.navigation.navigate("LocationsScreen");
  }

  goToMapScreen() {
    this.props.navigation.navigate("MapScreen");
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

export default connect(mapStateToProps)(Navigation);

