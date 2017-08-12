/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehicleDetails              ->  index
 * POST    /api/vehicleDetails              ->  create
 * GET     /api/vehicleDetails/:id          ->  show
 * PUT     /api/vehicleDetails/:id          ->  upsert
 * PATCH   /api/vehicleDetails/:id          ->  patch
 * DELETE  /api/vehicleDetails/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity && entity != entity instanceof Array) {
            return res.status(statusCode).json(entity);
        } else if (entity instanceof Array) {
            var entityConverted = entity.reduce(function (acc, cur, i) {
                acc[i] = cur;
                return acc;
            }, {});
            return res.status(statusCode).json(entityConverted);
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

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.destroy().then(function () {
                res.status(204).end();
            });
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).send({
                message: 'entity not found',
                found: false
            });
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of VehicleDetails
function index(req, res) {
    return _sqldb.VehicleDetail.findAll({
        include: [{
            model: _sqldb.Dealer
        }]
    }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single VehicleDetail from the DB
function show(req, res) {
    return _sqldb.VehicleDetail.find({
        where: {
            VehicleMasterId: req.params.id
        },
        include: [{
            model: _sqldb.Dealer
            // where: { DealerId: 'abc' }
        }]
    }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new VehicleDetail in the DB
function create(req, res) {

    return _sqldb.VehicleDetail.create(req.body.data).then(respondWithResult(res, 201)).catch(handleError(res));
}

//Upserts the given VehicleDetail in the DB at the specified ID

function upsert(req, res) {

    if (req.params.id == 0) {
        return _sqldb.VehicleDetail.create(req.body).then(respondWithResult(res)).catch(handleError(res));
    } else {

        return _sqldb.VehicleDetail.update(req.body, {
            where: {
                _id: req.params.id
            }
        }).then(respondWithResult(res)).catch(handleError(res));
    }
}

// Updates an existing VehicleDetail in the DB
function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return _sqldb.VehicleDetail.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a VehicleDetail from the DB
function destroy(req, res) {
    return _sqldb.VehicleDetail.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

// Gets a list of Vehicles
// export function index(req, res) {
//     return Vehicle.findAll({
//         include: [
//             {
//                 model: VehicleModel
//             }, {
//                 model: VehicleDetails,
//                 include: [
//                     {
//                         model: Dealer
//                     }
//                 ]
//             }
//         ]
//     })
//         .then(respondWithResult(res))
//         .catch(handleError(res));
// }
//# sourceMappingURL=vehicleDetail.controller.js.map
