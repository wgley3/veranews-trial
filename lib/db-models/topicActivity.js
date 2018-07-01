module.exports = function (sequelize, dataTypes) {
  return sequelize.define('topicActivity', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'topicActivity',
    collate: 'utf8_unicode_ci',
    timestamp: true
  });
};
