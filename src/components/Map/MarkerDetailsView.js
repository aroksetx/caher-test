import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { isNil } from 'lodash';
import {
    Colors,
    TextInput,
    TextArea,
    Typography,
    Modal,
    Button
} from 'react-native-ui-lib'; //eslint-disable-line
import Expo from 'expo';

export default class MapMarkerCreationWindow extends Component {
    constructor(props) {
        super(props);
        const {marker, isNew} = this.props;

        this.state = {
            name: isNil(isNew) || isNew ? '' : marker.name,
            description: isNil(isNew) || isNew ? '' : marker.description,
            lat: marker.lat,
            lng: marker.lng
        };
    }

    saveMarker = () => {
        const {onAddMarker} = this.props;
        onAddMarker(this.state);
    };

    updateMarker = () => {
        const {onUpdateMarker} = this.props;
        onUpdateMarker(this.state);
    };

    removeMarker = () => {
        const {onRemoveMarker, onDeclineMarker, isNew} = this.props;
        isNew ? onDeclineMarker() : onRemoveMarker(this.state);
    };

    cancelEdit = () => {
        const {onDeclineMarker} = this.props;
        onDeclineMarker();
    };

    render() {
        const {isNew} = this.props;
        const buttonTextConfig = {
            add: 'Add marker',
            update: 'Update marker',
            remove: 'Remove marker',
            decline: 'Decline marker',
            close: 'Cancel'
        };

        const cancelButton = () => {
            if (!isNew) {
                return (
                    <Button
                        label={buttonTextConfig.close}
                        color="#fff"
                        size={'medium'}
                        backgroundColor={'#ff8856'}
                        style={styles.buttonsStyle}
                        onPress={this.cancelEdit}
                        accessibilityLabel="Learn more about this purple button"
                    />
                );
            }
        };


        return (
            <View style={styles.newMarkerBlock}>
                <View style={{flex: 1, padding: 20}}>
                    <TextInput
                        testId={'marker_name'}
                        floatingPlaceholder
                        style={styles.inputFields}
                        containerStyle={styles.inputFieldsContainer}
                        placeholder="Type marker name!"
                        value={this.state.name}
                        onChangeText={name => this.setState({name})}
                    />
                    <TextInput
                        style={styles.inputFields}
                        containerStyle={styles.inputFieldsContainer}
                        placeholder="Type marker description!"
                        value={this.state.description}
                        onChangeText={description => this.setState({description})}
                    />
                </View>
                <View style={styles.buttonsContentBlock}>
                    <Button
                        label={isNew ? buttonTextConfig.add : buttonTextConfig.update}
                        onPress={isNew ? this.saveMarker : this.updateMarker}
                        style={styles.buttonsStyle}
                        color="#fff"
                        size={'medium'}
                        disabled={
                            this.state.name.length === 0 || this.state.name.trim() === ''
                        }
                        accessibilityLabel="Learn more about this purple button"
                    />

                    <Button
                        label={isNew ? buttonTextConfig.decline : buttonTextConfig.remove}
                        color="#fff"
                        size={'medium'}
                        backgroundColor={'red'}
                        style={styles.buttonsStyle}
                        onPress={this.removeMarker}
                        accessibilityLabel="Learn more about this purple button"
                    />
                    {cancelButton()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentBlock: {
        flex: 1
    },
    buttonsContentBlock: {
        flex: 2,
        flexDirection: 'column',
        padding: 15,
        marginTop: 10
    },
    buttonsStyle: {
        borderRadius: Platform.OS === 'ios' ? 20 : 0,
        marginBottom: 10
    },
    inputFields: {
        height: 20,
        ...Typography.text
    },
    inputFieldsContainer: {},
    newMarkerBlock: {
        flex: 1,
        position: 'absolute',
        flexDirection: 'column',
        backgroundColor: 'rgba(255,255,255, 1)',
        width: Dimensions.get('window').width,
        marginTop: Expo.Constants.statusBarHeight,
    },
    markerNameInput: {
        flex: 1,
        flexDirection: 'row',
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        padding: 15
    }
});
