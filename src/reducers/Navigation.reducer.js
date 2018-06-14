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
        case NavigationStateActions.GO_TO_LOCATIONS:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'LocationsScreen'}),
                state
            );
            break;
        case NavigationStateActions.GO_TO_MAP:
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({routeName: 'MapScreen'}),
                state
            );
            break;
        default:
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};
