/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
 function makeDashboardRequest(method, data, api) {
   return request[method](api, data);
 }

export function storeImages(data, user) {
  return { type: types.DASHBOARD_USER_IMAGES, data, user };
}

export function getUserImages() {
  return dispatch => {
    return makeDashboardRequest('get', {},'/dashboard/retrieve')
      .then((response) => {
        dispatch(storeImages(response.data.data, response.data.user));
      });
      //.catch(() => dispatch(createTopicFailure({id,
        //error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}
