'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                   Configuring local strategy to authenticate strategies
                                                                                                                                                                                                                                                   Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
                                                                                                                                                                                                                                                   */

var _passportLocal = require('passport-local');

var _db = require('../../db');

var _unsupportedMessage = require('../../db/unsupportedMessage');

var _unsupportedMessage2 = _interopRequireDefault(_unsupportedMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (passport) {
  if (!_db.passport || !_db.passport.local || !_typeof(_db.passport.local) === 'function') {
    console.warn((0, _unsupportedMessage2.default)('passport-local'));
    return;
  }

  /*
  By default, LocalStrategy expects to find credentials in parameters named username and password.
  If your site prefers to name these fields differently,
  options are available to change the defaults.
  */
  passport.use(new _passportLocal.Strategy({
    usernameField: 'email'
  }, _db.passport.local));
};