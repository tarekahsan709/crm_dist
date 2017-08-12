'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Grade', {
    grade_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    grade_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    grade_description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Grade'
  });
};
//# sourceMappingURL=grade.model.js.map
