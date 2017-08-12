/**
 * Main application routes
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  // Insert routes below
  app.use('/api/emis', require('./api/emi'));
  app.use('/api/sales', require('./api/sale'));
  app.use('/api/vehicleDetails', require('./api/vehicleDetail'));
  app.use('/api/vehicles', require('./api/vehicle'));
  app.use('/api/roles', require('./api/role'));
  app.use('/api/problems', require('./api/problem'));
  app.use('/api/permissions', require('./api/permission'));
  app.use('/api/vehicleModels', require('./api/vehicleModel'));
  app.use('/api/jobs', require('./api/job'));
  app.use('/api/grades', require('./api/grade'));
  app.use('/api/employees', require('./api/employee'));
  app.use('/api/designations', require('./api/designation'));
  app.use('/api/dealers', require('./api/dealer'));
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/areas', require('./api/area'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

  // All other routes should redirect to the index.html
  app.route('/*').get(function (req, res) {
    res.sendFile(_path2.default.resolve(app.get('appPath') + '/index.html'));
  });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
