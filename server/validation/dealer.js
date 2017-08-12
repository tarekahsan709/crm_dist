'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isDataValid = isDataValid;
var Joi = require('joi');

var schema = Joi.object().keys({
    dealer_name: Joi.string().alphanum().min(3).max(30).required(),
    dealer_email: Joi.string().email().required(),
    dealer_phone: Joi.number().integer().min(10),
    dealer_type: Joi.string().alphanum().min(3).max(30)
}).with('dealer_name', 'dealer_email').without('dealer_phone', 'dealer_type');

// You can also pass a callback which will be called synchronously with the validation result.
// Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { });  // err === null -> valid


function isDataValid(req, res, next) {
    var result = Joi.validate(req.body, schema);
    if (result.error === null) {
        next();
    } else {
        return res.status(400).json(result.error);
    }
}
//# sourceMappingURL=dealer.js.map
