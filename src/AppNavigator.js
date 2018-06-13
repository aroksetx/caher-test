import { createStackNavigator } from 'react-navigation';
import { initializeListeners } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { navigationPropConstructor } from './utils/redux';
import PropTypes from 'prop-types';
import React from "react";
import { Easing, Animated } from 'react-native';


import MapScreen from './screens/MapScreen';
import LocationsScreen from './screens/LocationsScreen';

export const AppNavigator = createStackNavigator({
    MapScreen: { screen: MapScreen },
    LocationsScreen: { screen: LocationsScreen }
},
{
  headerMode: 'none',
  mode: 'modal',
  navigationOptions: {
    gesturesEnabled: false,
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateY }] };
    },
  }),
}


);

class AppNavigation extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      nav: PropTypes.object.isRequired,
    };
  
    componentDidMount() {
      initializeListeners('root', this.props.nav);
    }
  
    render() {
      const { dispatch, nav } = this.props;
      const navigation = navigationPropConstructor(dispatch, nav);
      return <AppNavigator navigation={navigation} />;
    }
  }
  
  const mapStateToProps = state => ({
    nav: state.nav,
  });
  
  export default connect(mapStateToProps)(AppNavigation);