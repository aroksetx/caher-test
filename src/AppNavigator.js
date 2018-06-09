import { createStackNavigator } from 'react-navigation';
import MapScreen from './screens/MapScreen';
import LocationsScreen from './screens/LocationsScreen';

export default createStackNavigator({
    MapScreen: { screen: MapScreen },
    LocationsScreen: { screen: LocationsScreen }
});
