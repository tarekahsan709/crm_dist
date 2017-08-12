'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('Customer', {
        _id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customer_phone: {
            type: DataTypes.INTEGER(14),
            allowNull: false,
            unique: {
                msg: 'The mobile number is already in use.'
            }
        },
        customer_address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        free_service_number: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'Customer'
    });
};
//# sourceMappingURL=customer.model.js.map
