module.exports = (sequelize, DataTypes) => {
  const PaymentInfo = sequelize.define(
    'PaymentInfo',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      card_holder: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      card_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cvv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expire_month: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      expire_year: {
        type: DataTypes.CHAR(4),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      freezeTableName: true,
    }
  );
  return PaymentInfo;
};
