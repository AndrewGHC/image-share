'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _passportGoogleOauth = require('passport-google-oauth');

var _secrets = require('../secrets');

var _unsupportedMessage = require('../../db/unsupportedMessage');

var _unsupportedMessage2 = _interopRequireDefault(_unsupportedMessage);

var _db = require('../../db');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport) {
  if (!_db.passport || !_db.passport.google || !_typeof(_db.passport.google) === 'function') {
    console.warn((0, _unsupportedMessage2.default)('passport-google-oauth'));
    return;
  }

  /*
  * OAuth Strategy taken modified from https://github.com/sahat/hackathon-starter/blob/master/config/passport.js
  *
  * - User is already logged in.
  *   - Check if there is an existing account with a provider id.
  *     - If there is, return an error message. (Account merging not supported)
  *     - Else link new OAuth account with currently logged-in user.
  * - User is not logged in.
  *   - Check if it's a returning user.
  *     - If returning user, sign in and we are done.
  *     - Else check if there is an existing account with user's email.
  *       - If there is, return an error message.
  *       - Else create a new account.
  *
  * The Google OAuth 2.0 authentication strategy authenticates
  * users using a Google account and OAuth 2.0 tokens.
  * The strategy requires a verify callback, which accepts these
  * credentials and calls done providing a user, as well
  * as options specifying a client ID, client secret, and callback URL.
  */
  passport.use(new _passportGoogleOauth.OAuth2Strategy({
    clientID: _secrets.google.clientID,
    clientSecret: _secrets.google.clientSecret,
    callbackURL: _secrets.google.callbackURL
  }, _db.passport.google));
};