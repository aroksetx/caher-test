import React, { Component } from "react";
import { View } from "react-native";
import { Colors, Button } from "react-native-ui-lib"; //eslint-disable-line
import styles from "./NavigationStyles";

export default class NavigationItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <Button
          size={'medium'}
          style={styles.itemButton}
          onPress={this.props.action}
          label={this.props.title}
        />
      </View>
    );
  }
}
