'use strict';

/**
 * Created by tarek on 12/25/16.
 */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Customer_vehicle', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'Customer',
                key: '_id'
            }
        },
        vehicle_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'Vehicle_master',
                key: '_id'
            }
        }
    }, {
        tableName: 'Customer_vehicle'
    });
};
//# sourceMappingURL=customerVehicles.model.js.map
