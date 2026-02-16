import env from './env.js';
import app from './app.js';

import {
  initializeDataSource,
  disconnectDataSource,
} from './lib/typeorm/typeorm.js';

// Start the server and initialize the database connection
const server = app.listen(env.PORT, async () => {
  await initializeDataSource();
  console.log(`Server listening on http://localhost:${env.PORT}`);
});

// Graceful Shutdown
async function gracefulShutdown(signal: string) {
  console.log(`\n${signal} received. Starting graceful shutdown...`);

  // 1. Set a timeout to forcefully exit if shutdown takes too long (e.g., 10 seconds)
  const forceExit = setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down',
    );
    process.exit(1);
  }, 10000);

  // 2. Close the HTTP server (stop accepting new requests)
  server.close(async () => {
    console.log('HTTP server closed.');

    // 3. Close database connections and other resources (Redis, etc)
    try {
      await disconnectDataSource();
      clearTimeout(forceExit);
      console.log('Graceful shutdown complete.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database disconnection', err);
      process.exit(1);
    }
  });
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
