import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
