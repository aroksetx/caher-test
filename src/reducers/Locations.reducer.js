import { LocationsStateActions } from '../actions';

const initiaLocationsState = {
  locations: [],
  deviceLocation: {},
  isEdit: false,
  isNew: false,
  markerPoint: {}
};



export const locationsState = (state = initiaLocationsState, action) => {
  switch (action.type) {
    case LocationsStateActions.ADD_NEW_LOCATION:
      return {
        ...state,
        locations: [...state.locations, ...action.payloader]
      };

    case LocationsStateActions.UPDATE_LOCATION:
      const { index, marker } = action.payloader;

      return {
        ...state,
        locations: state.locations.map(
          (item, itemIndex) =>
            itemIndex === index ? { ...item, ...marker } : item
        )
      };

    case LocationsStateActions.REMOVE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (item, itemIndex) => itemIndex !== action.payloader.index
        )
      };

    case LocationsStateActions.SET_DEVICE_LAST_LOCATION:
      return {
        ...state,
        deviceLocation: action.payloader
      };

    case LocationsStateActions.SHOW_MARKER_DETAIL_VIEW:
      return {
        ...state,
        isEdit: true,
        markerPoint: action.payloader.coordinate,
        isNew: action.payloader.isNew
      };

    case LocationsStateActions.HIDE_MARKER_DETAIL_VIEW:
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
