import React, {Component} from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';
import styles from './NavigationStyles';

export default class NavigationItem extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Button  onPress={this.props.action} title={this.props.title}/>
            </View>
        );
    }
}