'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Designation', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    designation_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation_descriptions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    designation_level: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'Designation'
  });
};
//# sourceMappingURL=designation.model.js.map
