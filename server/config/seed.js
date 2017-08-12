
/**
 * Populate DB with sample data on server startUser.sync()
    .then(() => User.destroy({where: {}}))
    .then(() => {
        User.bulkCreate([{
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'tarekahsan709@gmail.com',
            password: 'admin'
        }])
            .then(() => {
                console.log('finished populating users');
            });
    });
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _sqldb = require('../sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Area = _sqldb2.default.Area;
var Customer = _sqldb2.default.Customer;
var Dealer = _sqldb2.default.Dealer;
var Designation = _sqldb2.default.Designation;
var Employee = _sqldb2.default.Employee;
var Grade = _sqldb2.default.Grade;
var Job = _sqldb2.default.Job;
var Permission = _sqldb2.default.Permission;
var Problem = _sqldb2.default.Problem;
var Role = _sqldb2.default.Role;
var Vehicle = _sqldb2.default.Vehicle;
var VehicleModel = _sqldb2.default.VehicleModel;
var CustomerVehicle = _sqldb2.default.CustomerVehicle;
var VehicleDetail = _sqldb2.default.VehicleDetail;
var JobCartProblems = _sqldb2.default.JobCartProblems;
var RolePermissions = _sqldb2.default.RolePermissions;
var User = _sqldb2.default.User;

// User.sync()
//     .then(() => User.destroy({where: {}}))
//     .then(() => {
//         User.bulkCreate([{
//             provider: 'local',
//             name: 'Test User',
//             email: 'test@example.com',
//             password: 'test'
//         }, {
//             provider: 'local',
//             role: 'admin',
//             name: 'Admin',
//             email: 'tarekahsan709@gmail.com',
//             password: 'admin'
//         }])
//             .then(() => {
//                 console.log('finished populating users');
//             });
//     });

//
// VehicleModel.sync()
//     .then(() => {
//         return VehicleModel.destroy({where: {}});
//     })
//     .then(() => {
//         VehicleModel.bulkCreate([{
//             "vehicle_model_name": "sed ac"
//         }, {
//             "vehicle_model_name": "at vel"
//         }, {
//             "vehicle_model_name": "odio e"
//         }, {
//             "vehicle_model_name": "sempe"
//         }, {
//             "vehicle_model_name": "iaculis"
//         }]);
//     });
//
//
// Vehicle.sync()
//     .then(() => {
//         return Vehicle.destroy({where: {}});
//     })
//     .then(() => {
//         Vehicle.bulkCreate([{
//             "vehicle_master_chassis_no": "53346-1309",
//             "vehicle_master_engine_no": "11673-517",
//             "number_of_servicing": "5",
//             "VehicleModelId": 2
//
//
//         }, {
//             "vehicle_master_chassis_no": "0409-7809",
//             "vehicle_master_engine_no": "0268-6560",
//             "number_of_servicing": "5",
//             "VehicleModelId": 2
//
//
//         }, {
//             "vehicle_master_chassis_no": "0944-4201",
//             "vehicle_master_engine_no": "64159-7048",
//             "number_of_servicing": "5",
//             "VehicleModelId": 3
//
//
//         }, {
//             "vehicle_master_chassis_no": "49349-126",
//             "vehicle_master_engine_no": "49715-007",
//             "number_of_servicing": "5",
//             "VehicleModelId": 4
//
//         }, {
//             "vehicle_master_chassis_no": "42787-102",
//             "vehicle_master_engine_no": "11673-245",
//             "number_of_servicing": "5",
//             "VehicleModelId": 5
//
//         }]);
//     });

//
// VehicleDetail.sync()
//     .then(() => {
//         return VehicleDetail.destroy({where: {}});
//     })
//     .then(() => {
//         VehicleDetail.bulkCreate([{
//             "vehicle_detail_name": "est et tempus semper est quam pharetra magna ac consequat metus",
//             "vehicle_detail_description": "consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit lacinia",
//             "vehicle_detail_sales_date": "3/3/2016",
//             "vehicle_details_import_date": "8/3/2016",
//             "vehicle_detail_dealer_id": 1,
//             "vehicle_detail_last_grade": 1,
//             "vehicle_details_total_free_service": 1,
//             "vehicle_detail_free_service_status": 1,
//             "vehicle_detail_allocated_service_date": "10/17/2016",
//             "vehicle_detail_service_date": "2/29/2016",
//             "vehicle_detail_last_milage": 1,
//             "DealerId": 6,
//             "VehicleMasterId":10
//         }, {
//             "vehicle_detail_name": "id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec molestie",
//             "vehicle_detail_description": "primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti",
//             "vehicle_detail_sales_date": "6/2/2016",
//             "vehicle_details_import_date": "5/19/2016",
//             "vehicle_detail_dealer_id": 2,
//             "vehicle_detail_last_grade": 2,
//             "vehicle_details_total_free_service": 2,
//             "vehicle_detail_free_service_status": 2,
//             "vehicle_detail_allocated_service_date": "12/12/2016",
//             "vehicle_detail_service_date": "8/26/2016",
//             "vehicle_detail_last_milage": 2,
//             "DealerId": 7,
//             "VehicleMasterId": 11
//         }, {
//             "vehicle_detail_name": "praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla",
//             "vehicle_detail_description": "ultrices posuere cubilia curae mauris viverra diam vitae quam suspendisse",
//             "vehicle_detail_sales_date": "12/20/2016",
//             "vehicle_details_import_date": "9/26/2016",
//             "vehicle_detail_dealer_id": 3,
//             "vehicle_detail_last_grade": 3,
//             "vehicle_details_total_free_service": 3,
//             "vehicle_detail_free_service_status": 3,
//             "vehicle_detail_allocated_service_date": "10/28/2016",
//             "vehicle_detail_service_date": "2/6/2016",
//             "vehicle_detail_last_milage": 3,
//             "DealerId": 8,
//             "VehicleMasterId":12
//         }, {
//             "vehicle_detail_name": "sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus at diam nam tristique",
//             "vehicle_detail_description": "ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra diam vitae",
//             "vehicle_detail_sales_date": "8/29/2016",
//             "vehicle_details_import_date": "6/16/2016",
//             "vehicle_detail_dealer_id": 4,
//             "vehicle_detail_last_grade": 4,
//             "vehicle_details_total_free_service": 4,
//             "vehicle_detail_free_service_status": 4,
//             "vehicle_detail_allocated_service_date": "4/18/2016",
//             "vehicle_detail_service_date": "4/6/2016",
//             "vehicle_detail_last_milage": 4,
//             "DealerId": 9,
//             "VehicleMasterId":13
//         }, {
//             "vehicle_detail_name": "nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta volutpat quam",
//             "vehicle_detail_description": "montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id",
//             "vehicle_detail_sales_date": "4/8/2016",
//             "vehicle_details_import_date": "10/27/2016",
//             "vehicle_detail_dealer_id": 5,
//             "vehicle_detail_last_grade": 5,
//             "vehicle_details_total_free_service": 5,
//             "vehicle_detail_free_service_status": 5,
//             "vehicle_detail_allocated_service_date": "1/27/2016",
//             "vehicle_detail_service_date": "7/31/2016",
//             "vehicle_detail_last_milage": 5,
//             "DealerId": 10,
//             "VehicleMasterId": 14
//         }]);
//     });
//

// Area.sync()
//     .then(() => {
//         return Area.destroy({where: {}});
//     })
//     .then(() => {
//         Area.bulkCreate([{
//             "area_name": "accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa",
//             "area_address": "132 Waxwing Pass"
//         }, {
//             "area_name": "a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum",
//             "area_address": "82 Knutson Circle"
//         }, {
//             "area_name": "vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae mauris viverra",
//             "area_address": "3770 Hazelcrest Pass"
//         }, {
//             "area_name": "donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce congue diam",
//             "area_address": "95 Vidon Street"
//         }, {
//             "area_name": "risus semper porta volutpat quam pede lobortis ligula sit amet",
//             "area_address": "0 Manitowish Center"
//         }]);
//     });
//
//
// Customer.sync()
//     .then(() => {
//         return Customer.destroy({where: {}});
//     })
//     .then(() => {
//         Customer.bulkCreate([{
//             "customer_name": "tellus nulla",
//             "customer_tin": 12345,
//             "customer_phone": 1812898998,
//             "customer_address": "Mohammadpur",
//             "free_service_number": 5
//         },{
//             "customer_name": "non velit",
//             "customer_tin": 2568,
//             "customer_phone": 1812898978,
//             "customer_address": "Dhanmondi",
//             "free_service_number": 5
//         }]);
//     });
//
//
// Dealer.sync()
//     .then(() => {
//         return Dealer.destroy({where: {}});
//     })
//     .then(() => {
//         Dealer.bulkCreate([{
//             "dealer_name": "pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat",
//             "dealer_address": "00515 Fairfield Drive"
//         }, {
//             "dealer_name": "ante vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa tempor convallis nulla neque",
//             "dealer_address": "28342 Raven Drive"
//         }, {
//             "dealer_name": "donec semper sapien a libero nam dui proin leo odio",
//             "dealer_address": "7145 Merry Hill"
//         }, {
//             "dealer_name": "massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim",
//             "dealer_address": "4 Victoria Drive"
//         }, {
//             "dealer_name": "cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum",
//             "dealer_address": "84 Westridge Parkway"
//         }]);
//     });
//
//
//
// Designation.sync()
//     .then(() => {
//         return Designation.destroy({where: {}});
//     })
//     .then(() => {
//         Designation.bulkCreate([{
//             "designation_name": "nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam",
//             "designation_descriptions": "luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh",
//             "designation_lavel": 1
//         }, {
//             "designation_name": "sed justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est et",
//             "designation_descriptions": "diam in magna bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus",
//             "designation_lavel": 2
//         }, {
//             "designation_name": "magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget",
//             "designation_descriptions": "vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante ipsum primis in faucibus orci luctus",
//             "designation_lavel": 3
//         }, {
//             "designation_name": "orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio odio elementum eu",
//             "designation_descriptions": "sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus",
//             "designation_lavel": 4
//         }, {
//             "designation_name": "odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus",
//             "designation_descriptions": "potenti in eleifend quam a odio in hac habitasse platea dictumst maecenas",
//             "designation_lavel": 5
//         }]);
//     });
//
//
//
//
// Employee.sync()
//     .then(() => {
//         return Employee.destroy({where: {}});
//     })
//     .then(() => {
//         Employee.bulkCreate([{
//             "employee_name": "quam fringilla rhoncus ",
//             "DesignationId": 1
//         }, {
//             "employee_name": "volutpat erat quisque ",
//             "DesignationId": 2
//         }, {
//             "employee_name": "molestie sed justo ",
//             "DesignationId": 3
//         }, {
//             "employee_name": "magna vulputate",
//             "DesignationId": 4
//         }, {
//             "employee_name": "arcu sed augue",
//             "DesignationId": 5
//         }]);
//     });
//
//
//
// Grade.sync()
//     .then(() => {
//         return Grade.destroy({where: {}});
//     })
//     .then(() => {
//         Grade.bulkCreate([{
//             "grade_name": "interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum",
//             "grade_description": "natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque aenean"
//         }, {
//             "grade_name": "quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus",
//             "grade_description": "libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac nulla sed"
//         }, {
//             "grade_name": "sapien placerat ante nulla justo aliquam quis turpis eget elit sodales scelerisque mauris sit amet eros suspendisse",
//             "grade_description": "in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer"
//         }, {
//             "grade_name": "pede justo lacinia eget tincidunt eget tempus vel pede morbi porttitor lorem id ligula",
//             "grade_description": "vestibulum rutrum rutrum neque aenean auctor gravida sem praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi"
//         }, {
//             "grade_name": "maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo odio condimentum id luctus nec",
//             "grade_description": "sed magna at nunc commodo placerat praesent blandit nam nulla"
//         }]);
//     });
//
//
//
// Job.sync()
//     .then(() => {
//         return Job.destroy({where: {}});
//     })
//     .then(() => {
//         Job.bulkCreate([{
//             "_id": 1,
//             "job_name": "odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras",
//             "job_reason": "justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia",
//             "job_terms": "justo sollicitudin ",
//             "job_date": "11/15/2016",
//             "VehicleMasterId": 1
//         }, {
//             "_id": 2,
//             "job_name": "consequat lectus in est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla",
//             "job_reason": "consequat metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus",
//             "job_terms": "consequat",
//             "job_date": "4/28/2016",
//             "VehicleMasterId": 2
//         }, {
//             "_id": 3,
//             "job_name": "non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed",
//             "job_reason": "penatibus et magnis dis parturient montes nascetur ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus",
//             "job_terms": "penatibus enatibus",
//             "job_date": "12/16/2016",
//             "VehicleMasterId": 3
//
//         }, {
//             "_id": 4,
//             "job_name": "morbi vestibulum velit id pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat",
//             "job_reason": "quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in lectus",
//             "job_terms": "quam pede",
//             "job_date": "6/1/2016",
//             "VehicleMasterId": 4
//
//         }, {
//             "_id": 5,
//             "job_name": "eu sapien cursus vestibulum proin eu mi nulla ac enim in",
//             "job_reason": "ornare imperdiet sapien urna pretium nisl ut volutpat sapien arcu",
//             "job_terms": "ornare ",
//             "job_date": "8/18/2016",
//             "VehicleMasterId": 5
//
//         }]);
//     });
//
//
//
// Permission.sync()
//     .then(() => {
//         return Permission.destroy({where: {}});
//     })
//     .then(() => {
//         Permission.bulkCreate([{
//             "permisson_name": "vestibulum sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo"
//         }, {
//             "permisson_name": "orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus"
//         }, {
//             "permisson_name": "volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas"
//         }, {
//             "permisson_name": "mus etiam vel augue vestibulum rutrum rutrum neque aenean auctor gravida"
//         }, {
//             "permisson_name": "amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh"
//         }]);
//     });
//
//
//
// Problem.sync()
//     .then(() => {
//         return Problem.destroy({where: {}});
//     })
//     .then(() => {
//         Problem.bulkCreate([{
//             "problem_name": "vulputate elementum nullam varius nulla facilisi cras non velit nec nisi vulputate nonummy maecenas tincidunt lacus at",
//             "problem_description": "dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum",
//             "problem_fee": 28
//         }, {
//             "problem_name": "arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec",
//             "problem_description": "etiam pretium iaculis justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus",
//             "problem_fee": 74
//         }, {
//             "problem_name": "habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante",
//             "problem_description": "lectus suspendisse potenti in eleifend quam a odio in hac",
//             "problem_fee": 59
//         }, {
//             "problem_name": "quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam molestie nibh in",
//             "problem_description": "luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi at nibh in hac",
//             "problem_fee": 87
//         }, {
//             "problem_name": "orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec nisi",
//             "problem_description": "mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed",
//             "problem_fee": 46
//         }]);
//     });
//
//
//
// Role.sync()
//     .then(() => {
//         return Role.destroy({where: {}});
//     })
//     .then(() => {
//         Role.bulkCreate([{
//             "role_name": "nonummy integer non velit donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus"
//         }, {
//             "role_name": "pretium iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit sodales"
//         }, {
//             "role_name": "posuere cubilia curae mauris viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis"
//         }, {
//             "role_name": "turpis donec posuere metus vitae ipsum aliquam non mauris morbi non"
//         }, {
//             "role_name": "vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis orci eget"
//         }]);
//     });
//
//
//
//
//
//
// CustomerVehicle.sync()
//     .then(() => {
//         return CustomerVehicle.destroy({where: {}});
//     })
//     .then(() => {
//         CustomerVehicle.bulkCreate([{
//             "customer_vehicle_customer_id": 1,
//             "customer_vehicle_vehicle_id": 1
//         }]);
//     });
//
//
//
//


// JobCartProblems.sync()
//     .then(() => {
//         return JobCartProblems.destroy({where: {}});
//     })
//     .then(() => {
//         JobCartProblems.bulkCreate([{
//             "job_cart_problem_id": 1,
//             "job_cart_problem_advice_id": 1,
//             "job_cart_problem_mistry_id": 1,
//             "job_cart_problem_receiver_id": 1
//         }, {
//             "job_cart_problem_id": 2,
//             "job_cart_problem_advice_id": 2,
//             "job_cart_problem_mistry_id": 2,
//             "job_cart_problem_receiver_id": 2
//         }, {
//             "job_cart_problem_id": 3,
//             "job_cart_problem_advice_id": 3,
//             "job_cart_problem_mistry_id": 3,
//             "job_cart_problem_receiver_id": 3
//         }, {
//             "job_cart_problem_id": 4,
//             "job_cart_problem_advice_id": 4,
//             "job_cart_problem_mistry_id": 4,
//             "job_cart_problem_receiver_id": 4
//         }, {
//             "job_cart_problem_id": 5,
//             "job_cart_problem_advice_id": 5,
//             "job_cart_problem_mistry_id": 5,
//             "job_cart_problem_receiver_id": 5
//         }]);
//     });
//
//
//
// RolePermissions.sync()
//     .then(() => {
//         return RolePermissions.destroy({where: {}});
//     })
//     .then(() => {
//         RolePermissions.bulkCreate([{
//             "role_id": 1,
//             "permission_id": 1
//         }, {
//             "role_id": 2,
//             "permission_id": 2
//         }, {
//             "role_id": 3,
//             "permission_id": 3
//         }, {
//             "role_id": 4,
//             "permission_id": 4
//         }, {
//             "role_id": 5,
//             "permission_id": 5
//         }]);
//     });
//# sourceMappingURL=seed.js.map
