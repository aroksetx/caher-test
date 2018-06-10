import { createStackNavigator } from 'react-navigation';
import { initializeListeners } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { navigationPropConstructor } from './utils/redux';
import PropTypes from 'prop-types';
import React from "react";

import MapScreen from './screens/MapScreen';
import LocationsScreen from './screens/LocationsScreen';

export const AppNavigator = createStackNavigator({
    MapScreen: { screen: MapScreen },
    LocationsScreen: { screen: LocationsScreen }
});

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