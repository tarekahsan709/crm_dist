'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  return sequelize.define('Problem', {
    _id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    problem_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    problem_description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    problem_fee: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    tableName: 'Problem'
  });
};
//# sourceMappingURL=problem.model.js.map
