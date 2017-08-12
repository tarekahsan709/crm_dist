'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('Vehicle_master', {
        _id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vehicle_master_chassis_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicle_master_engine_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicle_color: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number_of_servicing: {
            type: DataTypes.INTEGER(12),
            allowNull: false,
            defaultValue: 4

        },
        servicing_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'Vehicle_master'
    });
};
//# sourceMappingURL=vehicle.model.js.map
