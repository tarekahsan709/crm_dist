'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.create = create;
exports.show = show;
exports.destroy = destroy;
exports.patch = patch;
exports.changePassword = changePassword;
exports.me = me;
exports.authCallback = authCallback;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _sqldb = require('../../sqldb');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _environment = require('../../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function (entity) {
        try {
            _fastJsonPatch2.default.apply(entity, patches, /*validate*/true);
        } catch (err) {
            return _promise2.default.reject(err);
        }

        return entity.save();
    };
}

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function (err) {
        return res.status(statusCode).json(err);
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        return res.status(statusCode).send(err);
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
function index(req, res) {
    return _sqldb.User.findAll({
        attributes: ['_id', 'name', 'firstName', 'lastName', 'email', 'activate', 'role',
        // 'createdAt',
        // 'updatedAt',
        'provider']
    }).then(function (users) {
        res.status(200).json(users);
    }).catch(handleError(res));
}

/**
 * Creates a new user
 */
function create(req, res, next) {
    var newUser = _sqldb.User.build(req.body);
    newUser.setDataValue('provider', 'local');
    // newUser.setDataValue('role', 'user');
    return newUser.save().then(function (user) {
        var token = _jsonwebtoken2.default.sign({ _id: user._id }, _environment2.default.secrets.session, {
            expiresIn: 60 * 60 * 5
        });
        res.json({ token: token });
    }).catch(validationError(res));
}

/**
 * Get a single user
 */
function show(req, res, next) {
    var userId = req.params.id;

    return _sqldb.User.find({
        where: {
            _id: userId
        }
    }).then(function (user) {
        if (!user) {
            return res.status(404).end();
        }
        res.json(user.profile);
    }).catch(function (err) {
        return next(err);
    });
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
function destroy(req, res) {
    return _sqldb.User.destroy({ where: { _id: req.params.id } }).then(function () {
        res.status(204).end();
    }).catch(handleError(res));
}

/**
 * Update a user
 * restriction: 'admin'
 */
function patch(req, res) {
    // console.log('request****************************************************')
    // console.log(req);
    // console.log('response****************************************************')
    // console.log(res);

    if (req.body._id) {
        delete req.body._id;
    }
    return _sqldb.User.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

/**
 * Change a users password
 */
function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    return _sqldb.User.find({
        where: {
            _id: userId
        }
    }).then(function (user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            return user.save().then(function () {
                res.status(204).end();
            }).catch(validationError(res));
        } else {
            return res.status(403).end();
        }
    });
}

/**
 * Get my info
 */
function me(req, res, next) {
    var userId = req.user._id;

    return _sqldb.User.find({
        where: {
            _id: userId
        },
        attributes: ['_id', 'name', 'firstName', 'lastName', 'email', 'activate', 'role', 'provider']
    }).then(function (user) {
        // don't ever give out the password or salt
        if (!user) {
            return res.status(401).end();
        }
        res.json(user);
    }).catch(function (err) {
        return next(err);
    });
}

/**
 * Authentication callback
 */
function authCallback(req, res, next) {
    res.redirect('/');
}
//# sourceMappingURL=user.controller.js.map
