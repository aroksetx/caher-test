import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../AppNavigator';
import { NavigationStateActions } from '../actions';

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
                NavigationActions.navigate({routeName: NavigationStateActions.GO_TO_MAP}),
                state
            );
            break;
        case 'MapScreen':
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: NavigationStateActions.GO_TO_LOCATIONS}),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};
