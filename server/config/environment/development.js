'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
// module.exports = {
//
//   // Sequelize connection opions
//   sequelize: {
//     uri: 'mysql://root:1234567Asd#@localhost:3306/CRM',
//     options: {
//       logging: false,
//       define: {
//         timestamps: false
//       },
//       dialect:'mysql'
//
//     }
//   },
//
//   // Seed database on startup
//    seedDB: true
//
// };


// for local at home
'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================

module.exports = {

  // Sequelize connection opions
  sequelize: {
    uri: 'mysql://root:user@127.0.0.1:3306/CRM',
    options: {
      logging: false,
      define: {
        timestamps: false
      },
      dialect: 'mysql'

    }
  },

  // Seed database on startup
  seedDB: true

};
// for local at home
//# sourceMappingURL=development.js.map
