'use strict';

/**
 * Created by tarek on 12/25/16.
 */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('UserRole', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        role_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'Role',
                key: 'role_id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'User',
                key: '_id'
            }
        }
    }, {
        tableName: 'UserRole'
    });
};
//# sourceMappingURL=userRoles.model.js.map
