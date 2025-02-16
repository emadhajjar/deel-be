import { app } from './app';
import { Config } from './config';

await init();

async function init() {
  try {
    app.listen(Config.port, () => {
      console.log(`Express App Listening on Port ${Config.port}`);
    });
  } catch (error) {
    throw new Error(`An error occurred: ${JSON.stringify(error)}`);
  }
}
