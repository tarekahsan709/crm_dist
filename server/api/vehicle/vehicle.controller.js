/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehicles              ->  index
 * POST    /api/vehicles              ->  create
 * GET     /api/vehicles/:id          ->  show
 * PUT     /api/vehicles/:id          ->  upsert
 * PATCH   /api/vehicles/:id          ->  patch
 * DELETE  /api/vehicles/:id          ->  destroy
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
exports.details = details;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _sqldb = require('../../sqldb');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {VehicleDetails} from '../../sqldb';
// import {Dealer} from '../../sqldb';

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
            res.status(404).end();
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

// Gets a list of Vehicles
function index(req, res) {

    return _sqldb.Vehicle.findAll({
        include: [{
            model: _sqldb.VehicleModel
        }]
    }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Vehicle from the DB
function show(req, res) {
    return _sqldb.Vehicle.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Vehicle in the DB
function create(req, res) {
    return _sqldb.Vehicle.create(req.body.data).then(respondWithResult(res, 201)).catch(handleError(res));
}

function details(req, res) {
    var customerId;
    var detailsResponse = {};
    return _sqldb.CustomerVehicle.find({
        where: {
            vehicle_id: req.params.id
        }
    }).then(function (response) {
        // console.log(response.dataValues);
        customerId = response.dataValues.customer_id;
        return _sqldb.Customer.find({
            where: {
                _id: customerId
            }
        });
    }).then(function (customer) {
        detailsResponse.customer = customer.dataValues;
        return _sqldb.Job.findAll({
            where: {
                VehicleMasterId: req.params.id
            }
        });
    }).then(function (jobs) {

        detailsResponse.jobs = jobs;

        return detailsResponse;
        // return res.status(200).json(detailsResponse);
    }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Upserts the given Vehicle in the DB at the specified ID
function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    return _sqldb.Vehicle.update(req.body, {
        where: {
            _id: req.params.id
        }
    }).then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Vehicle in the DB
function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return _sqldb.Vehicle.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Vehicle from the DB
function destroy(req, res) {
    return _sqldb.Vehicle.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
// include: [VehicleModel, VehicleDetails]


// // Gets a list of Vehicles
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
//# sourceMappingURL=vehicle.controller.js.map