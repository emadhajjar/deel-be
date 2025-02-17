import { Transaction } from 'sequelize';

import { sequelize } from '../model';

export async function prepareTransaction<T>(
  callback: (transaction: Transaction) => T,
  onCommit: (data: T) => any,
) {
  const transaction = await sequelize.transaction();

  try {
    const data = await callback(transaction);

    await transaction.commit();

    return onCommit(data);
  } catch (error) {
    await transaction.rollback();

    console.error(error);
    throw error;
  }
}
