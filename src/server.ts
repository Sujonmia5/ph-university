/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';
import { Server } from 'http';
import createSuperAdmin from './app/DB';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    createSuperAdmin();

    app.listen(config.port, () => {
      console.log(`Example app listening on ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
process.on('unhandledRejection', (reason, promise) => {
  console.log('unhandledRejection server shut down');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException server shut down');
  process.exit(1);
});
