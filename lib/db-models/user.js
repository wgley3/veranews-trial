module.exports = function (sequelize, dataTypes) {
  return sequelize.define('user', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cookieID: {
      type: dataTypes.STRING,
      allowNull: false
    },
    liberalness: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    ageRange: {
      type: dataTypes.STRING,
      allowNull: false
    },
    experimentGroup: {
      type: dataTypes.STRING(2),
      allowNull: false
    }
  }, {
    tableName: 'user',
    collate: 'utf8_unicode_ci',
    timestamp: true
  });
};
