module.exports = function (sequelize, dataTypes) {
  return sequelize.define('article', {
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
    body: {
      type: dataTypes.TEXT,
      allowNull: false
    },
    conservative: {
      type: dataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'article',
    collate: 'utf8_unicode_ci',
    timestamp: true
  });
};
