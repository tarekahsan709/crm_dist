'use strict';

var _dealer = require('../../validation/dealer');

var dealer = _interopRequireWildcard(_dealer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var router = express.Router();
var controller = require('./dealer.controller');


router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', dealer.isDataValid, controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
//# sourceMappingURL=index.js.map
