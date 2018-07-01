module.exports = function (sequelize, dataTypes) {
  return sequelize.define('batchActivity', {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    converted: {
      type: dataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    experimentGroup: {
      type: dataTypes.STRING(2),
      allowNull: false
    }
  }, {
    tableName: 'batchActivity',
    collate: 'utf8_unicode_ci',
    timestamp: true
  });
};
