const initiaLocationsState = {
  locations: [],
  deviceLocation: {},
  isEdit: false,
  isNew: false,
  markerPoint: {}
};

export const locationsStateActions = {
  ADD_NEW_LOCATION: "ADD_NEW_LOCATION",
  REMOVE_LOCATION: "REMOVE_LOCATION",
  UPDATE_LOCATION: "UPDATE_LOCATION",
  SET_DEVICE_LAST_LOCATION: "SET_DEVICE_LAST_LOCATION",
  SHOW_MARKER_DETAIL_VIEW: "SHOW_MARKER_DETAIL_VIEW",
  HIDE_MARKER_DETAIL_VIEW: "HIDE_MARKER_DETAIL_VIEW"
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

    case locationsStateActions.SHOW_MARKER_DETAIL_VIEW:
      return {
        ...state,
        isEdit: true,
        markerPoint: action.payloader.coordinate,
        isNew: action.payloader.isNew
      };

    case locationsStateActions.HIDE_MARKER_DETAIL_VIEW:
      return {
        ...state,
        isEdit: false,
        markerPoint: action.payloader,
        isNew: false
      };
      
    default:
      return state;
  }
};
