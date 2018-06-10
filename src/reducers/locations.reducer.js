const initiaLocationsState = {
  locations: []
};

export const locationsStateActions = {
  ADD_NEW_LOCATION: "ADD_NEW_LOCATION",
  removeLocation: "REMOVE_LOCATION",
  updateLocation: "UPDATE_LOCATION"
};

export const locationsState = (state = initiaLocationsState, action) => {
  switch (action.type) {
    case locationsStateActions.ADD_NEW_LOCATION:
      return {
        ...state,
        locations: [
          ...action.payloader
        ]
      };

    default:
      return state;
  }
};
