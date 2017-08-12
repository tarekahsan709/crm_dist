'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('Job', {
        _id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        job_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        job_terms: {
            type: DataTypes.STRING,
            allowNull: true
        },
        job_fee: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        job_status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        job_allocated_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'Job'
    });
};
//# sourceMappingURL=job.model.js.map
