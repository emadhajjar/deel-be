import { app } from './app';
import { Config } from './config';
import { sequelize } from './model';

await init();

async function init() {
  try {
    await sequelize.authenticate();

    app.listen(Config.port, () => {
      console.log(`Express App Listening on Port ${Config.port}`);
    });
  } catch (error) {
    throw new Error(`An error occurred: ${JSON.stringify(error)}`);
  }
}
