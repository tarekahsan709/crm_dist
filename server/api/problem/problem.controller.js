/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/problems              ->  index
 * POST    /api/problems              ->  create
 * GET     /api/problems/:id          ->  show
 * PUT     /api/problems/:id          ->  upsert
 * PATCH   /api/problems/:id          ->  patch
 * DELETE  /api/problems/:id          ->  destroy
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

// Gets a list of Problems
function index(req, res) {
  return _sqldb.Problem.findAll().then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Problem from the DB
function show(req, res) {
  return _sqldb.Problem.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Problem in the DB
function create(req, res) {
  return _sqldb.Problem.create(req.body.data).then(respondWithResult(res, 201)).catch(handleError(res));
}

// Upserts the given Problem in the DB at the specified ID
function upsert(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return _sqldb.Problem.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  }).then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Problem in the DB
function patch(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return _sqldb.Problem.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Problem from the DB
function destroy(req, res) {
  return _sqldb.Problem.find({
    where: {
      _id: req.params.id
    }
  }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}
//# sourceMappingURL=problem.controller.js.map
