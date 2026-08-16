import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import orgsData from './data/organizations.json';

export async function seedOrganizations(dataSource: DataSource): Promise<void> {
  const qr = dataSource.createQueryRunner();
  await qr.connect();
  await qr.startTransaction();

  try {
    for (const orgData of orgsData) {
      const existing = await qr.manager.query(
        `SELECT id FROM users WHERE email = $1`,
        [orgData.admin.email],
      );
      if (existing.length > 0) {
        console.log(`  SKIP: ${orgData.business_name} (${orgData.admin.email} already exists)`);
        continue;
      }

      const [org] = await qr.manager.query(
        `INSERT INTO orgs (business_name, legal_name) VALUES ($1,$2) RETURNING *`,
        [orgData.business_name, orgData.legal_name || null],
      );

      const [site] = await qr.manager.query(
        `INSERT INTO sites (org_id, name, code, types) VALUES ($1,$2,$3,$4) RETURNING *`,
        [org.id, orgData.business_name, orgData.site.code, orgData.site.types],
      );

      const passwordHash = await bcrypt.hash(orgData.admin.password, 12);
      const token = uuidv4();
      const tokenExpires = new Date(Date.now() + 24 * 3600000);

      await qr.manager.query(
        `INSERT INTO users ("site_id", "email", "password_hash", "firstName", "lastName", "role", "role_id", "principal_type", "emailVerificationToken", "emailVerificationExpires", "isEmailVerified")
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [site.id, orgData.admin.email, passwordHash, orgData.admin.firstName, orgData.admin.lastName, orgData.admin.role, uuidv4(), 'staff', token, tokenExpires, true],
      );

      console.log(`  OK:  ${orgData.business_name} (${orgData.admin.email} / ${orgData.admin.password})`);
    }

    await qr.commitTransaction();
  } catch (error) {
    await qr.rollbackTransaction();
    throw error;
  } finally {
    await qr.release();
  }
}
