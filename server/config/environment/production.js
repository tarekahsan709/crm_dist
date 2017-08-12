'use strict';
/*eslint no-process-env:0*/

// Production specific configuration
// =================================

module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP || process.env.ip || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT || process.env.port || 8000,

  sequelize: {
    uri: 'mysql://root:user@127.0.0.1:3306/CRM',
    options: {
      logging: false,
      define: {
        timestamps: false
      },
      dialect: 'mysql'

    }

    // sequelize: {
    //   uri: process.env.SEQUELIZE_URI
    //     || 'sqlite://',
    //   options: {
    //     logging: false,
    //     storage: 'dist.sqlite',
    //     define: {
    //       timestamps: false
    //     }
    //   }
    // }
  } };
//# sourceMappingURL=production.js.map
