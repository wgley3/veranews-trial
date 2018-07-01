'use strict';

var Sequelize = require('sequelize');
var path = require('path');
var fs = require('fs');

var config = require(__dirname + '/../config').db;

var db = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  port: config.port,
  dialect: 'mysql'
});

var IGNORE = ['index.js'];

// MODELS_DIR: Static constant
var MODELS_DIR = path.resolve(__dirname, 'db-models');

// files: We'll export each one of these that aren't marked for ignoring.
var files = fs.readdirSync(MODELS_DIR).filter(function (directory) {
  return (IGNORE.indexOf(directory) == -1);
});

var modelsToImport = {};

files.forEach(function (filename) {
  var modelName = filename.slice(0, -2); // trim ".js"
  modelsToImport[modelName] = path.resolve(MODELS_DIR, filename);
});

var model;

for (var modelName in modelsToImport) {
  model = db.import(modelsToImport[modelName]);
  db.models[model.name] = model;
}

db.models.topic.hasMany(db.models.article, {as: 'articles'});
db.models.topic.hasMany(db.models.topicActivity, {
  as: 'topicActivities'
});
db.models.user.hasMany(db.models.topicActivity, {
  foreignKey: 'cookieID',
  sourceKey: 'cookieID',
  constraints: false
});

db.models.user.hasOne(db.models.batchActivity, {as: 'user'});

module.exports = db;
