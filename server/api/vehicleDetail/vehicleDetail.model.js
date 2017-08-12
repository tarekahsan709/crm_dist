'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('Vehicle_detail', {
        _id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vehicle_detail_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vehicle_detail_description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        vehicle_detail_sales_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        vehicle_details_import_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        vehicle_detail_last_grade: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        vehicle_details_total_free_service: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        vehicle_detail_free_service_status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        vehicle_detail_allocated_service_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        vehicle_detail_service_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        vehicle_detail_last_milage: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
        tableName: 'Vehicle_detail'
    });
};
//# sourceMappingURL=vehicleDetail.model.js.map
