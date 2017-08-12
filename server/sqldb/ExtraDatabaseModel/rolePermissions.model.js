'use strict';

/**
 * Created by tarek on 12/25/16.
 */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Role_permission', {
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
        permission_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'Permission',
                key: 'permission_id'
            }
        }
    }, {
        tableName: 'Role_permission'
    });
};
//# sourceMappingURL=rolePermissions.model.js.map
