'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Area', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    area_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    area_address: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Area'
  });
};
//# sourceMappingURL=area.model.js.map
