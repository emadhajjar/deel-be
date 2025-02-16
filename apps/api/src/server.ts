import { app } from './app';

await init();

async function init() {
  try {
    app.listen(3001, () => {
      console.log('Express App Listening on Port 3001');
    });
  } catch (error) {
    throw new Error(`An error occurred: ${JSON.stringify(error)}`);
  }
}
