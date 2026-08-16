import 'dotenv/config';
import { DataSource } from 'typeorm';

import { seedOrganizations } from './seed/organizations.seed';
import { AppDataSource } from './config/data-source';

async function run() {
  await AppDataSource.initialize();
  console.log('Seeding database...\n');

  await seedOrganizations(AppDataSource);

  console.log('\nSeed complete.');
  await AppDataSource.destroy();
}

run().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
