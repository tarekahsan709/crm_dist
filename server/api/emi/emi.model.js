'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (sequelize, DataTypes) {
    return sequelize.define('EmiDetails', {
        _id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        is_emi_complete: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false

        },
        //Initially it is equivalent salesDetails due_payment
        principle: {
            type: DataTypes.INTEGER(12),
            allowNull: false
        },
        //total amount after compound interest
        payable_money: {
            type: DataTypes.INTEGER(12),
            allowNull: false
        },
        //compound monthly n =12, yearly n=1
        calculation_period: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        number_of_year: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 1
        },
        last_date_of_the_payment: {
            type: DataTypes.DATE,
            allowNull: false
        },
        payment_slot: {
            type: DataTypes.INTEGER(12),
            allowNull: true,
            defaultValue: 1

        },
        interest_rate: {
            type: DataTypes.INTEGER(12),
            allowNull: false
        }

    });
};
//# sourceMappingURL=emi.model.js.map
