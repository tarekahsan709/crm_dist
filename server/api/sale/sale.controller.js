/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sales              ->  index
 * POST    /api/sales              ->  create
 * GET     /api/sales/:id          ->  show
 * PUT     /api/sales/:id          ->  upsert
 * PATCH   /api/sales/:id          ->  patch
 * DELETE  /api/sales/:id          ->  destroy
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.index = index;
exports.show = show;
exports.saleDetails = saleDetails;
exports.create = create;
exports.upsert = upsert;
exports.patch = patch;
exports.destroy = destroy;

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

// Gets a list of Sales
function index(req, res) {
    return _sqldb.Sale.findAll({
        include: [{
            model: _sqldb.Employee,
            include: [{
                model: _sqldb.Designation
            }]
        }, {
            model: _sqldb.Customer
        }]
    }).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Sale from the DB
function show(req, res) {
    return _sqldb.Sale.find({
        where: {
            _id: req.params.id
        },
        include: [{
            model: _sqldb.Employee,
            include: [{
                model: _sqldb.Designation
            }]
        }, {
            model: _sqldb.Customer
        }]
    }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Gets a single Sale details from the DB
function saleDetails(req, res) {
    return _sqldb.SalesDetails.find({
        where: {
            SaleId: req.params.id
        },
        include: [{
            model: _sqldb.Vehicle
        }]
    }).then(handleEntityNotFound(res)).then(respondWithResult(res)).catch(handleError(res));
}

// Creates a new Sale in the DB
function create(req, res) {
    console.log(req.body.isNewCustomer);
    var vehicleId;
    var customerId;
    return _sqldb2.default.sequelize.transaction(function (t) {

        // chain all your queries here. make sure you return them.
        return _sqldb.Vehicle.create(req.body.Vehicle, { transaction: t }).then(function (vehicle) {
            vehicleId = vehicle.dataValues._id;
            if (req.body.isNewCustomer) {
                return _sqldb.Customer.create(req.body.Customer, { transaction: t });
            } else {
                return vehicle;
            }
        }).then(function (customer) {
            if (req.body.isNewCustomer) {
                customerId = customer.dataValues._id;
            } else {
                customerId = req.body.customerId;
            }
        });
    }).then(function (result) {
        return _sqldb.Sale.create({
            "description": req.body.description,
            "EmployeeId": req.body.EmployeeId,
            "CustomerId": customerId
        });
    }).then(function (sale) {
        var SaleId = sale.dataValues._id;
        req.body.SalesDetails.SaleId = sale.dataValues._id;
        req.body.SalesDetails.VehicleMasterId = vehicleId;

        if (req.body.SalesDetails.payment_method == 'credit') {
            var principle = req.body.SalesDetails.price - req.body.SalesDetails.discount - req.body.SalesDetails.down_payment; // p
            var calculation_period = monthDiff(new Date(req.body.SalesDetails.credit_start_date), new Date(req.body.SalesDetails.credit_end_date)); // n
            var t = 1; // t
            console.log('calculation_period');
            console.log(calculation_period);
            var last_date_of_the_payment = req.body.SalesDetails.credit_end_date;
            var interest_rate = req.body.EmiDetails.interest_rate; // r

            // The equation is A = p * [[1 + (r/n)] ^ nt]
            var payable_money = principle * Math.pow(1 + interest_rate / (calculation_period * 100), calculation_period * t);

            console.log('payable_money');
            console.log(payable_money);

            console.log('Total interest');
            console.log((payable_money.toFixed(2) - principle).toFixed(2));

            _sqldb2.default.sequelize.query('INSERT INTO `EmiDetails` (`SaleId`,`principle`, `payable_money`, `last_date_of_the_payment`, `calculation_period`, `interest_rate`) VALUES (:SaleId, :principle, :payable_money, :last_date_of_the_payment, :calculation_period, :interest_rate)', {
                replacements: {
                    SaleId: SaleId,
                    principle: principle,
                    payable_money: payable_money,
                    last_date_of_the_payment: new Date(last_date_of_the_payment),
                    calculation_period: calculation_period,
                    interest_rate: interest_rate
                },
                type: _sqldb2.default.sequelize.QueryTypes.INSERT
            });
        }

        return _sqldb.SalesDetails.create(req.body.SalesDetails);
    }).then(function (saleDetailsResponse) {

        return _sqldb2.default.sequelize.query('INSERT INTO `Customer_vehicle` (`customer_id`,`vehicle_id`) VALUES (:customer_id, :vehicle_id)', {
            replacements: {
                customer_id: customerId,
                vehicle_id: vehicleId
            },
            type: _sqldb2.default.sequelize.QueryTypes.INSERT
        });
    }).then(respondWithResult(res, 201)).catch(function (err) {
        console.log('err');
        console.log(err);
    });
}

// Upserts the given Sale in the DB at the specified ID

// export function upsert(req, res) {
//     let customer_id = req.body.Customer._id;
//     let vehicle_id = req.body.Vehicle._id;
//     let sale_id = req.body.SalesDetails.SaleId;
//
//     let sale = {
//         description: req.body.description,
//         EmployeeId: req.body.EmployeeId,
//         CustomerId: req.body.Customer._id
//     };
//
//     if (req.body._id) {
//         delete req.body.Customer._id;
//         delete req.body.Vehicle._id;
//         delete req.body.SalesDetails.SaleId;
//     }
//
//
//     return Customer.update(req.body.Customer, {
//         where: {
//             _id: customer_id
//         }
//     })
//         .then(function (customerResponse) {
//             return Vehicle.update(req.body.Vehicle, {
//                 where: {
//                     _id: vehicle_id
//                 }
//             })
//         })
//         .then(function (vehicleResponse) {
//             return SalesDetails.update(req.body.SalesDetails, {
//                 where: {
//                     SaleId: sale_id
//                 }
//             })
//         })
//         .then(function (salesDetailsResponse) {
//             return Sale.update(sale, {
//                 where: {
//                     _id: sale_id
//                 }
//             })
//         })
//         .then(respondWithResult(res))
//         .catch(handleError(res));
//
//
// }

function upsert(req, res) {
    var customer_id = req.body.Customer._id;
    var vehicle_id = req.body.Vehicle._id;
    var sale_id = req.body.SalesDetails.SaleId;

    var sale = {
        description: req.body.description,
        EmployeeId: req.body.EmployeeId,
        CustomerId: req.body.Customer._id
    };

    if (req.body.SalesDetails.payment_method == 'cash') {
        _sqldb.Emi.destroy({
            where: {
                SaleId: sale_id
            }
        });
    }

    if (req.body.EmiDetails) {
        _sqldb.Emi.update(req.body.EmiDetails, {
            where: {
                SaleId: sale_id
            }
        });
    }

    if (req.body.Customer) {
        delete req.body.Customer._id;
        _sqldb.Customer.update(req.body.Customer, {
            where: {
                _id: customer_id
            }
        });
    }

    if (req.body.Vehicle) {
        delete req.body.Vehicle._id;
        _sqldb.Vehicle.update(req.body.Vehicle, {
            where: {
                _id: vehicle_id
            }
        });
    }

    if (req.body.SalesDetails) {
        delete req.body.SalesDetails.SaleId;
        req.body.SalesDetails.VehicleMasterId = vehicle_id;
        _sqldb.SalesDetails.update(req.body.SalesDetails, {
            where: {
                SaleId: sale_id
            }
        });
    }

    return _sqldb.Sale.update(sale, {
        where: {
            _id: sale_id
        }
    }).then(respondWithResult(res)).catch(handleError(res));
}

// Updates an existing Sale in the DB
function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return _sqldb.Sale.find({
        where: {
            _id: req.params.id
        }
    }).then(handleEntityNotFound(res)).then(patchUpdates(req.body)).then(respondWithResult(res)).catch(handleError(res));
}

// Deletes a Sale from the DB
function destroy(req, res) {

    return _sqldb.SalesDetails.destroy({
        where: {
            SaleId: req.params.id
        }
    }).then(function (saleDetailsResponse) {

        return _sqldb.Emi.destroy({
            where: {
                SaleId: req.params.id
            }
        });
    }).then(function (emiDetailsResponse) {
        return _sqldb.Sale.find({
            where: {
                _id: req.params.id
            }
        });
    }).then(handleEntityNotFound(res)).then(removeEntity(res)).catch(handleError(res));
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months + 1;
}
//# sourceMappingURL=sale.controller.js.map
