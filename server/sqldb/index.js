/**
 * Sequelize initialization module
 */

'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
var db = {
  Sequelize,
  sequelize: new Sequelize('CRM', 'root', 'user', {
    host: 35.188.197.18,
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  })
};

// for local at home
// var db = {
//     Sequelize: _sequelize2.default,
//     sequelize: new _sequelize2.default(_environment2.default.sequelize.uri, _environment2.default.sequelize.options)
// };
// for local at home

db.sequelize.authenticate().then(function (err) {
    console.log('Connection has been established successfully.');
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
});
// sales details design has declared here


var salesDetails = db.sequelize.define('salesDetails', {
    price: {
        type: db.Sequelize.INTEGER(15),
        allowNull: false
    },
    sales_date: {
        type: db.Sequelize.DATE,
        allowNull: false
    },
    credit_start_date: {
        type: db.Sequelize.DATE,
        allowNull: true
    },
    credit_end_date: {
        type: db.Sequelize.DATE,
        allowNull: true
    },
    free_service_number: {
        type: db.Sequelize.INTEGER(5),
        allowNull: true
    },
    discount: {
        type: db.Sequelize.INTEGER(12),
        allowNull: true
    },
    down_payment: {
        type: db.Sequelize.INTEGER(12),
        allowNull: true
    },
    due_payment: {
        type: db.Sequelize.INTEGER(12),
        allowNull: true
    },
    degree_of_trust: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    internal_reference: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    payment_method: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
});

// const emiDetails = db.sequelize.define('EmiDetails', {
//     _id: {
//         type: db.Sequelize.INTEGER(11),
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     is_emi_complete: {
//         type: db.Sequelize.BOOLEAN,
//         allowNull: true,
//         defaultValue:false
//
//     },
//     //Initially it is equivalent salesDetails due_payment
//     payable_money: {
//         type: db.Sequelize.STRING,
//         allowNull: false
//     },
//     date_of_the_payment: {
//         type: db.Sequelize.DATE,
//         allowNull: false
//     },
//     payment_slot: {
//         type: db.Sequelize.INTEGER(12),
//         allowNull: true,
//         defaultValue: 1
//
//     },
//     interest_rate: {
//         type: db.Sequelize.INTEGER(12),
//         allowNull: false
//     }
// });


// Insert models below
db.Emi = db.sequelize.import('../api/emi/emi.model');
db.Sale = db.sequelize.import('../api/sale/sale.model');
db.SalesDetails = salesDetails;
db.EmiDetails = db.sequelize.import('../api/emi/emi.model');
// db.VehicleDetail = db.sequelize.import('../api/vehicleDetail/vehicleDetail.model');
db.Vehicle = db.sequelize.import('../api/vehicle/vehicle.model');
db.Role = db.sequelize.import('../api/role/role.model');
db.Problem = db.sequelize.import('../api/problem/problem.model');
db.Permission = db.sequelize.import('../api/permission/permission.model');
db.VehicleModel = db.sequelize.import('../api/vehicleModel/vehicleModel.model');
db.Job = db.sequelize.import('../api/job/job.model');
db.Grade = db.sequelize.import('../api/grade/grade.model');
db.Employee = db.sequelize.import('../api/employee/employee.model');
db.Designation = db.sequelize.import('../api/designation/designation.model');
db.Dealer = db.sequelize.import('../api/dealer/dealer.model');
db.Customer = db.sequelize.import('../api/customer/customer.model');
db.Area = db.sequelize.import('../api/area/area.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.User = db.sequelize.import('../api/user/user.model');

db.CustomerVehicle = db.sequelize.import('ExtraDatabaseModel/customerVehicles.model');
db.RolePermissions = db.sequelize.import('ExtraDatabaseModel/rolePermissions.model');
// db.UserRole = db.sequelize.import('../ExtraDatabaseModel/userRoles.model'); not working


//------------------Database relations below

// db.VehicleDetail.belongsTo(db.Dealer);
db.Vehicle.belongsTo(db.VehicleModel);
// db.Vehicle.hasOne(db.VehicleDetail);
db.Employee.belongsTo(db.Designation);

db.Job.belongsTo(db.Vehicle);

db.Job.belongsToMany(db.Employee, { through: 'jobEmployeeMappingTable' }, { onDelete: 'cascade', hooks: true });

db.Employee.belongsToMany(db.Job, { through: 'jobEmployeeMappingTable' });

db.Job.belongsToMany(db.Problem, { through: 'jobProblemMappingTable' }, { onDelete: 'cascade', hooks: true });

db.Problem.belongsToMany(db.Job, { through: 'jobProblemMappingTable' });

db.Employee.hasMany(db.Sale);

db.Sale.belongsTo(db.Employee);

db.Customer.hasMany(db.Sale);

db.Sale.belongsTo(db.Customer);

db.Area.hasMany(db.Customer);

db.Sale.belongsToMany(db.Vehicle, { through: 'salesDetails' }, { onDelete: 'cascade', hooks: true });

db.Vehicle.belongsToMany(db.Sale, { through: 'salesDetails' });

salesDetails.belongsTo(db.Sale);

salesDetails.belongsTo(db.Vehicle);

db.EmiDetails.belongsTo(db.Sale);

db.User.belongsToMany(db.Role, { through: 'UserRole' });
db.Role.belongsToMany(db.User, { through: 'UserRole' });

module.exports = db;
//# sourceMappingURL=index.js.map
