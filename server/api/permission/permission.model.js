'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Permission', {
    permission_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    permisson_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Permission'
  });
};
//# sourceMappingURL=permission.model.js.map
