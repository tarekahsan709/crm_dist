'use strict';

var _sale = require('../../validation/sale');

var sale = _interopRequireWildcard(_sale);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var controller = require('./sale.controller');
var router = express.Router();


router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.get('/:id/details', auth.hasRole('admin'), controller.saleDetails);
router.post('/', auth.hasRole('admin'), sale.isSaleCreateDataValid, controller.create);
router.put('/:id', auth.hasRole('admin'), sale.isSaleUpdateDataValid, controller.upsert);
router.patch('/:id', auth.hasRole('admin'), controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
