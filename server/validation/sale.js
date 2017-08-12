'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isSaleCreateDataValid = isSaleCreateDataValid;
exports.isSaleUpdateDataValid = isSaleUpdateDataValid;
var Joi = require('joi');

var saleSchema = Joi.object().keys({

    description: Joi.string().alphanum().min(3).max(30).required(),
    EmployeeId: Joi.number().integer().required(),
    customerId: Joi.number().integer().optional(),
    isNewCustomer: Joi.boolean().required(),

    Vehicle: Joi.object().keys({
        vehicle_master_engine_no: Joi.string().min(3).max(30).required(),
        vehicle_master_chassis_no: Joi.string().min(3).max(30).required(),
        number_of_servicing: Joi.number().integer(),
        vehicle_color: Joi.string().required(),
        VehicleModelId: Joi.number().integer().required()
    }),
    Customer: Joi.object().keys({
        customer_name: Joi.string().min(3).max(30).required(),
        AreaId: Joi.number().integer().required(),
        customer_phone: Joi.number().min(10).required(),
        customer_address: Joi.string().min(3).max(30),
        free_service_number: Joi.number().integer()
    }),
    SalesDetails: Joi.object().keys({
        price: Joi.number().integer().required(),
        free_service_number: Joi.number().integer(),
        discount: Joi.number().integer().required(),
        internal_reference: Joi.string().min(3).max(30),
        payment_method: Joi.string().min(3).max(30).required(),
        down_payment: Joi.number(),
        due_payment: Joi.number(),
        sales_date: Joi.date().required(),
        credit_start_date: Joi.date(),
        credit_end_date: Joi.date()
    }),
    EmiDetails: Joi.object().keys({
        SaleId: Joi.number().integer().required(),
        payable_money: Joi.number().integer(),
        interest_rate: Joi.number().integer().required(),
        date_of_the_payment: Joi.date().required()
    })

});
var saleUpdateSchema = Joi.object().keys({
    id: Joi.number().integer().required(),
    description: Joi.string().alphanum().min(3).max(30).required(),
    EmployeeId: Joi.number().integer().required(),

    Vehicle: Joi.object().keys({
        _id: Joi.number().integer().required(),
        vehicle_master_engine_no: Joi.string().min(3).max(30).required(),
        vehicle_master_chassis_no: Joi.string().min(3).max(30).required(),
        number_of_servicing: Joi.number().integer(),
        vehicle_color: Joi.string().required(),
        VehicleModelId: Joi.number().integer().required()
    }),
    Customer: Joi.object().keys({
        _id: Joi.number().integer().required(),
        customer_name: Joi.string().min(3).max(30).required(),
        AreaId: Joi.number().integer().required(),
        customer_phone: Joi.number().min(10).required(),
        customer_address: Joi.string().min(3).max(30),
        free_service_number: Joi.number().integer()
    }),
    SalesDetails: Joi.object().keys({
        SaleId: Joi.number().integer().required(),
        price: Joi.number().integer().required(),
        discount: Joi.number().integer().required(),
        internal_reference: Joi.string().min(3).max(30),
        payment_method: Joi.string().min(3).max(30).required(),
        down_payment: Joi.number(),
        due_payment: Joi.number(),
        sales_date: Joi.date().required(),
        credit_start_date: Joi.date(),
        credit_end_date: Joi.date()
    }),
    EmiDetails: Joi.object().keys({
        payable_money: Joi.number().integer(),
        interest_rate: Joi.number().integer().required(),
        date_of_the_payment: Joi.date().required()
    }).optional()

});

function isSaleCreateDataValid(req, res, next) {
    var result = Joi.validate(req.body, saleSchema);
    if (result.error === null) {
        next();
    } else {
        return res.status(400).json(result.error);
    }
}

function isSaleUpdateDataValid(req, res, next) {
    var result = Joi.validate(req.body, saleUpdateSchema);
    if (result.error === null) {
        next();
    } else {
        return res.status(400).json(result.error);
    }
}
//# sourceMappingURL=sale.js.map
