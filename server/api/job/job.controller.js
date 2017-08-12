/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/jobs              ->  index
 * POST    /api/jobs              ->  create
 * GET     /api/jobs/:id          ->  show
 * PUT     /api/jobs/:id          ->  upsert
 * PATCH   /api/jobs/:id          ->  patch
 * DELETE  /api/jobs/:id          ->  destroy
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
exports.jobEmployee = jobEmployee;
exports.jobProblem = jobProblem;
exports.changeJobStatus = changeJobStatus;

var _fastJsonPatch = require('fast-json-patch');

var _fastJsonPatch2 = _interopRequireDefault(_fastJsonPatch);

var _sqldb = require('../../sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

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

// Gets a list of Jobs
function index(req, res) {

    return _sqldb.Job.findAll({
        include: [{
            model: _sqldb.Vehicle,
            include: [{
                model: _sqldb.VehicleModel
            }]
        }]
    }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Job from the DB
function show(req, res) {
    return _sqldb.Job.find({
        include: [{
            model: _sqldb.Problem,
            through: {
                where: { JobId: req.params.id }
            }
        }, {
            model: _sqldb.Employee,
            include: [{ model: _sqldb.Designation }],
            through: {
                attributes: ['employee_name'],
                where: { JobId: req.params.id }
            }
        }, {
            model: _sqldb.Vehicle
        }],
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Job in the DB
// export function create(req, res) {
//     var employeeId;
//     if (req.body.employeeId) {
//         employeeId = req.body.employeeId;
//         delete req.body.employeeId;
//     }
//
//     return Job.create(req.body) //request #1
//         .then(function (responseInsert) {
//             var jobId = responseInsert._id; //response handler #1
//             console.log(jobId);
//             return sqldb.sequelize.query('INSERT INTO jobEmployeeMappingTable(JobId, EmployeeId) VALUES (jobId, employeeId)'); //request #2
//         })
//         .then(respondWithResult(res, 201))
//         .catch(handleError(res));
//
// }
function create(req, res) {
    var employeeId;
    var problemId;
    if (req.body.employeeId) {
        employeeId = req.body.employeeId;
        problemId = req.body.problemId;
        delete req.body.employeeId;
        delete req.body.problemId;
    }

    //
    // sqldb.sequelize.query('SELECT number_of_servicing FROM Vehicle_master WHERE _id = ?',
    //     {
    //         replacements: [req.body.VehicleMasterId],
    //         type: sqldb.sequelize.QueryTypes.SELECT
    //     }
    // ).then(number_of_servicing => {
    //
    //     let servicing_number = number_of_servicing[0].number_of_servicing;
    //     console.log('Current number of servicing');
    //     console.log(servicing_number);
    //
    //     sqldb.sequelize.query('UPDATE `Vehicle_master` SET `number_of_servicing` = :number_of_servicing  WHERE _id = :_id',
    //         {
    //             replacements: {number_of_servicing: servicing_number + 1, _id:req.body.VehicleMasterId},
    //             type: sqldb.sequelize.QueryTypes.INSERT
    //         });
    // });


    return _sqldb2.default.sequelize.transaction(function (t) {

        return _sqldb.Job.create(req.body, { transaction: t }) // request #1

        .then(function (job) {

            _sqldb2.default.sequelize.query('UPDATE `Vehicle_master` SET `servicing_date` = :servicing_date WHERE _id = :_id', {
                replacements: { servicing_date: new Date(req.body.job_allocated_date), _id: req.body.VehicleMasterId },
                type: _sqldb2.default.sequelize.QueryTypes.INSERT
            });

            _sqldb2.default.sequelize.query('UPDATE `Vehicle_master` SET `number_of_servicing` = `number_of_servicing` + 1  WHERE _id = :_id', {
                replacements: { _id: req.body.VehicleMasterId },
                type: _sqldb2.default.sequelize.QueryTypes.INSERT
            });

            employeeId.forEach(function (eId) {
                _sqldb2.default.sequelize.query('INSERT INTO `jobEmployeeMappingTable` (`JobId`, `EmployeeId`) VALUES (:jobId, :empId)', {
                    replacements: { jobId: parseInt(job._id), empId: eId },
                    type: _sqldb2.default.sequelize.QueryTypes.INSERT
                });
            });

            problemId.forEach(function (pId) {
                _sqldb2.default.sequelize.query('INSERT INTO `jobProblemMappingTable` (`JobId`, `ProblemId`) VALUES (:jobId, :problemId)', {
                    replacements: { jobId: parseInt(job._id), problemId: pId },
                    type: _sqldb2.default.sequelize.QueryTypes.INSERT
                });
            });

            return job;
        });
    }).then(respondWithResult(res)).catch(function (err) {
        console.log(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}

// Upserts the given Job in the DB at the specified ID

function upsert(req, res) {
    var vehicleMaster, employees, problems;

    if (req.body._id) {
        vehicleMaster = req.body.Vehicle_master;
        console.log(vehicleMaster);

        employees = req.body.employees;
        problems = req.body.problems;
        delete req.body._id;
        delete req.body.Vehicle_master;
        delete req.body.employees;
        delete req.body.problems;
    }

    _sqldb2.default.sequelize.query('DELETE FROM `jobEmployeeMappingTable`  WHERE `JobId` = :jobId', {
        replacements: { jobId: req.params.id },
        type: _sqldb2.default.sequelize.QueryTypes.DELETE
    });

    _sqldb2.default.sequelize.query('DELETE FROM `jobProblemMappingTable`  WHERE `JobId` = :jobId', {
        replacements: { jobId: req.params.id },
        type: _sqldb2.default.sequelize.QueryTypes.DELETE
    });

    employees.forEach(function (eId) {

        _sqldb2.default.sequelize.query('INSERT INTO `jobEmployeeMappingTable` (`JobId`, `EmployeeId`) VALUES (:jobId, :empId)', {
            replacements: { jobId: req.params.id, empId: eId._id },
            type: _sqldb2.default.sequelize.QueryTypes.INSERT
        });
    });

    problems.forEach(function (pId) {
        _sqldb2.default.sequelize.query('INSERT INTO `jobProblemMappingTable` (`JobId`, `ProblemId`) VALUES (:jobId, :problemId)', {
            replacements: { jobId: req.params.id, problemId: pId._id },
            type: _sqldb2.default.sequelize.QueryTypes.INSERT
        });
    });

    _sqldb2.default.sequelize.query('UPDATE `Vehicle_master` SET `servicing_date` = :servicing_date WHERE _id = :_id', {
        replacements: { servicing_date: new Date(req.body.job_allocated_date), _id: req.body.VehicleMasterId },
        type: _sqldb2.default.sequelize.QueryTypes.INSERT
    });

    return _sqldb.Job.update(req.body, {
        where: {
            _id: req.params.id
        }
    }).then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Job in the DB
function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return _sqldb.Job.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Job from the DB
function destroy(req, res) {
    return _sqldb.Job.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function jobEmployee(req, res) {
    var jobId = req.params.id;

    _sqldb2.default.sequelize.query('SELECT EmployeeId FROM `jobEmployeeMappingTable` WHERE JobId = :jobId', {
        replacements: { jobId: parseInt(jobId) },
        type: _sqldb2.default.sequelize.QueryTypes.SELECT
    }).then(function (queryResult) {

        var employeeIds = queryResult.map(function (currentValue) {

            return currentValue.EmployeeId;
        });

        return _sqldb.Employee.findAll({
            include: [{
                model: _sqldb.Designation
            }],
            where: {
                _id: employeeIds
            }
        }).then(respondWithResult(res)).catch(handleError(res));
    });
}

function jobProblem(req, res) {
    var jobId = req.params.id;

    _sqldb2.default.sequelize.query('SELECT * FROM `jobProblemMappingTable` WHERE JobId = :jobId', {
        replacements: { jobId: parseInt(jobId) },
        type: _sqldb2.default.sequelize.QueryTypes.SELECT
    }).then(function (queryResult) {
        var problemIds = queryResult.map(function (currentValue) {

            return currentValue.ProblemId;
        });

        return _sqldb.Problem.findAll({
            where: {
                _id: problemIds
            }
        }).then(respondWithResult(res)).catch(handleError(res));
    });
}

function changeJobStatus(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }

    return _sqldb.Job.update(req.body, {
        where: {
            _id: req.params.id
        }
    }).then(respondWithResult(res)).catch(handleError(res));
}
//# sourceMappingURL=job.controller.js.map
