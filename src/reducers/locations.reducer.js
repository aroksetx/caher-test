const initiaLocationsState = {
  locations: [],
  deviceLocation: {}
};

export const locationsStateActions = {
  ADD_NEW_LOCATION: "ADD_NEW_LOCATION",
  REMOVE_LOCATION: "REMOVE_LOCATION",
  UPDATE_LOCATION: "UPDATE_LOCATION",
  SET_DEVICE_LAST_LOCATION: "SET_DEVICE_LAST_LOCATION"
};

export const locationsState = (state = initiaLocationsState, action) => {
  switch (action.type) {
    case locationsStateActions.ADD_NEW_LOCATION:
      return {
        ...state,
        locations: [...state.locations, ...action.payloader]
      };
    case locationsStateActions.SET_DEVICE_LAST_LOCATION:
      return {
        ...state,
        deviceLocation: action.payloader
      };

    default:
      return state;
  }
};
