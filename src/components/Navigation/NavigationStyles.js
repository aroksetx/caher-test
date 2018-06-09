import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    navigationBlock: {
        flex: 1,
        flexDirection:'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 15

    },
    itemBlock: {
        textAlign: 'center',
        fontWeight: '700'
    }
});