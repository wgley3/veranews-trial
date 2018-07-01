module.exports = function (sequelize, dataTypes) {
  return sequelize.define('topic', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: dataTypes.STRING,
      allowNull: false
    },
    color: {
      type: dataTypes.STRING,
      allowNull: false
    },
    excerpt: {
      type: dataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'topic',
    collate: 'utf8_unicode_ci',
    timestamp: true
  });
};
