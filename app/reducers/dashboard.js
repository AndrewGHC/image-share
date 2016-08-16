import * as types from 'types';
import { combineReducers } from 'redux';

const images = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.DASHBOARD_USER_IMAGES:
      return {
        data: action.data,
        user: action.user
      };
    default:
      return {};
  }
};

const dashboardReducer = combineReducers({
  images
});

export default dashboardReducer;
