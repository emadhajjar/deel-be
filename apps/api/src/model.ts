import { DataTypes, Model, Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

export class Profile extends Model {}
Profile.init(
  {
    balance: {
      type: DataTypes.DECIMAL(12, 2),
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    profession: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('client', 'contractor'),
    },
  },
  {
    modelName: 'Profile',
    sequelize,
  },
);

export class Contract extends Model {}
Contract.init(
  {
    status: {
      type: DataTypes.ENUM('new', 'in_progress', 'terminated'),
    },
    terms: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: 'Contract',
    sequelize,
  },
);

export class Job extends Model {}
Job.init(
  {
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    paid: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
    paymentDate: {
      type: DataTypes.DATE,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(12, 2),
    },
  },
  {
    modelName: 'Job',
    sequelize,
  },
);

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' });
Contract.belongsTo(Profile, { as: 'Contractor' });
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' });
Contract.belongsTo(Profile, { as: 'Client' });
Contract.hasMany(Job);
Job.belongsTo(Contract);
