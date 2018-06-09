import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    locationsContainer: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 12,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        paddingHorizontal: 10

    },
    locationDescriptionItem: {
        textAlign: 'center',
    },
    locationItemTitle: {
        fontWeight: 'bold',
        fontSize: 22
    },
    locationItemDescription: {
        paddingVertical: 5,
        flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',


    }
});