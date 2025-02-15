const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

class Profile extends Sequelize.Model {}
Profile.init(
  {
    balance: {
      type: Sequelize.DECIMAL(12, 2),
    },
    firstName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    lastName: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    profession: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM('client', 'contractor'),
    },
  },
  {
    modelName: 'Profile',
    sequelize,
  },
);

class Contract extends Sequelize.Model {}
Contract.init(
  {
    status: {
      type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
    },
    terms: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
  },
  {
    modelName: 'Contract',
    sequelize,
  },
);

class Job extends Sequelize.Model {}
Job.init(
  {
    description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    paid: {
      default: false,
      type: Sequelize.BOOLEAN,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL(12, 2),
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

module.exports = {
  Contract,
  Job,
  Profile,
  sequelize,
};
