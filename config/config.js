var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'aids-life-cycle'
    },
    port: 3000,
    db: 'mongodb://localhost/aids-life-cycle-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'aids-life-cycle'
    },
    port: 3000,
    db: 'mongodb://localhost/aids-life-cycle-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'aids-life-cycle'
    },
    port: 5000,
    db: 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds033429.mongolab.com:33429/heroku_app22368295'
  }
};

module.exports = config[env];