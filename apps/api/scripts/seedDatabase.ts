import { Contract, ContractStatus, Job, Profile, ProfileType } from '../src/model';

/* WARNING THIS WILL DROP THE CURRENT DATABASE */

await seed();

async function seed() {
  // create tables
  await Profile.sync({ force: true });
  await Contract.sync({ force: true });
  await Job.sync({ force: true });

  //insert data
  await Promise.all([
    Profile.create({
      balance: 1150,
      firstName: 'Harry',
      id: 1,
      lastName: 'Potter',
      profession: 'Wizard',
      type: ProfileType.CLIENT,
    }),
    Profile.create({
      balance: 231.11,
      firstName: 'Mr',
      id: 2,
      lastName: 'Robot',
      profession: 'Hacker',
      type: ProfileType.CLIENT,
    }),
    Profile.create({
      balance: 451.3,
      firstName: 'John',
      id: 3,
      lastName: 'Snow',
      profession: 'Knows nothing',
      type: ProfileType.CLIENT,
    }),
    Profile.create({
      balance: 1.3,
      firstName: 'Ash',
      id: 4,
      lastName: 'Kethcum',
      profession: 'Pokemon master',
      type: ProfileType.CLIENT,
    }),
    Profile.create({
      balance: 64,
      firstName: 'John',
      id: 5,
      lastName: 'Lenon',
      profession: 'Musician',
      type: ProfileType.CONTRACTOR,
    }),
    Profile.create({
      balance: 1214,
      firstName: 'Linus',
      id: 6,
      lastName: 'Torvalds',
      profession: 'Programmer',
      type: ProfileType.CONTRACTOR,
    }),
    Profile.create({
      balance: 22,
      firstName: 'Alan',
      id: 7,
      lastName: 'Turing',
      profession: 'Programmer',
      type: ProfileType.CONTRACTOR,
    }),
    Profile.create({
      balance: 314,
      firstName: 'Aragorn',
      id: 8,
      lastName: 'II Elessar Telcontarvalds',
      profession: 'Fighter',
      type: ProfileType.CONTRACTOR,
    }),
    Contract.create({
      ClientId: 1,
      ContractorId: 5,
      id: 1,
      status: ContractStatus.TERMINATED,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 1,
      ContractorId: 6,
      id: 2,
      status: ContractStatus.IN_PROGRESS,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 2,
      ContractorId: 6,
      id: 3,
      status: ContractStatus.IN_PROGRESS,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 2,
      ContractorId: 7,
      id: 4,
      status: ContractStatus.IN_PROGRESS,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 3,
      ContractorId: 8,
      id: 5,
      status: ContractStatus.NEW,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 3,
      ContractorId: 7,
      id: 6,
      status: ContractStatus.IN_PROGRESS,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 4,
      ContractorId: 7,
      id: 7,
      status: ContractStatus.IN_PROGRESS,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 4,
      ContractorId: 6,
      id: 8,
      status: ContractStatus.IN_PROGRESS,
      terms: 'bla bla bla',
    }),
    Contract.create({
      ClientId: 4,
      ContractorId: 8,
      id: 9,
      status: ContractStatus.IN_PROGRESS,
      terms: 'bla bla bla',
    }),
    Job.create({
      ContractId: 1,
      description: 'work',
      price: 200,
    }),
    Job.create({
      ContractId: 2,
      description: 'work',
      price: 201,
    }),
    Job.create({
      ContractId: 3,
      description: 'work',
      price: 202,
    }),
    Job.create({
      ContractId: 4,
      description: 'work',
      price: 200,
    }),
    Job.create({
      ContractId: 7,
      description: 'work',
      price: 200,
    }),
    Job.create({
      ContractId: 7,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-15T19:11:26.737Z'),
      price: 2020,
    }),
    Job.create({
      ContractId: 2,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-15T19:11:26.737Z'),
      price: 200,
    }),
    Job.create({
      ContractId: 3,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-16T19:11:26.737Z'),
      price: 200,
    }),
    Job.create({
      ContractId: 1,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-17T19:11:26.737Z'),
      price: 200,
    }),
    Job.create({
      ContractId: 5,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-17T19:11:26.737Z'),
      price: 200,
    }),
    Job.create({
      ContractId: 1,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-10T19:11:26.737Z'),
      price: 21,
    }),
    Job.create({
      ContractId: 2,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-15T19:11:26.737Z'),
      price: 21,
    }),
    Job.create({
      ContractId: 3,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-15T19:11:26.737Z'),
      price: 121,
    }),
    Job.create({
      ContractId: 3,
      description: 'work',
      paid: true,
      paymentDate: new Date('2020-08-14T23:11:26.737Z'),
      price: 121,
    }),
  ]);
}
