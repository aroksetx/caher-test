import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('LocationsScreen');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('MapScreen');

const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);


export const nav = (state = initialNavState, action) => {
  let nextState;
  switch (action.type) {
    case 'LocationScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LocationsScreen' }),
        state
      );
      break;
    case 'MapScreen':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'MapScreen' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
};


export const qweqweqwe = {
    ADD_NEW_LOCATION: "ADD_NEW_LOCATION",
    REMOVE_LOCATION: "REMOVE_LOCATION",
    UPDATE_LOCATION: "UPDATE_LOCATION",
    HIDE_MARKER_DETAIL_VIEW: "HIDE_MARKER_DETAIL_VIEW"
};