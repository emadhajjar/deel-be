import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
});

export enum ProfileType {
  CLIENT = 'client',
  CONTRACTOR = 'contractor',
}

export class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>> {
  declare balance: number;
  declare Client?: NonAttribute<Contract[]>;
  declare Contractor?: NonAttribute<Contract[]>;
  declare createdAt: CreationOptional<Date>;
  declare firstName: string;
  declare id: CreationOptional<number>;
  declare lastName: string;
  declare profession: string;
  declare type: ProfileType;
  declare updatedAt: CreationOptional<Date>;
}

Profile.init(
  {
    balance: {
      type: DataTypes.DECIMAL(12, 2),
    },
    createdAt: DataTypes.DATE,
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
      type: DataTypes.ENUM(ProfileType.CLIENT, ProfileType.CONTRACTOR),
    },
    updatedAt: DataTypes.DATE,
  },
  {
    modelName: 'Profile',
    sequelize,
  },
);

export enum ContractStatus {
  IN_PROGRESS = 'in_progress',
  NEW = 'new',
  TERMINATED = 'terminated',
}

export class Contract extends Model<InferAttributes<Contract>, InferCreationAttributes<Contract>> {
  declare ClientId: ForeignKey<Profile['id']>;
  declare ContractorId: ForeignKey<Profile['id']>;
  declare createdAt: CreationOptional<Date>;
  declare id: CreationOptional<number>;
  declare jobs?: NonAttribute<Job[]>;
  declare status: ContractStatus;
  declare terms: string;
  declare updatedAt: CreationOptional<Date>;
}

Contract.init(
  {
    createdAt: DataTypes.DATE,
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.ENUM(
        ContractStatus.NEW,
        ContractStatus.IN_PROGRESS,
        ContractStatus.TERMINATED,
      ),
    },
    terms: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    updatedAt: DataTypes.DATE,
  },
  {
    modelName: 'Contract',
    sequelize,
  },
);

export class Job extends Model<InferAttributes<Job>, InferCreationAttributes<Job>> {
  declare Contract?: NonAttribute<Contract>;
  declare ContractId: ForeignKey<Contract['id']>;
  declare createdAt: CreationOptional<Date>;
  declare description: string;
  declare id: CreationOptional<number>;
  declare paid?: boolean;
  declare paymentDate: Date | null;
  declare price: number;
  declare updatedAt: CreationOptional<Date>;
}

Job.init(
  {
    createdAt: DataTypes.DATE,
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    updatedAt: DataTypes.DATE,
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
