import { DataSource } from 'typeorm';

import env from '../../env.js';

// Entities
import { Answer } from '../../entities/answer.entity.js';
import { Class } from '../../entities/class.entity.js';
import { ClassUser } from '../../entities/classUser.entity.js';
import { Feedback } from '../../entities/feedback.entity.js';
import { Grade } from '../../entities/grade.entity.js';
import { Question } from '../../entities/question.entity.js';
import { RefreshToken } from '../../entities/refreshToken.entity.js';
import { Role } from '../../entities/role.entity.js';
import { School } from '../../entities/school.entity.js';
import { User } from '../../entities/user.entity.js';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  ssl: env.DATABASE_SSL,
  // synchronize: true,
  logging: env.NODE_ENV === 'development',
  entities: [
    Role,
    User,
    Grade,
    School,
    Class,
    ClassUser,
    Feedback,
    Question,
    Answer,
    RefreshToken,
  ],
  // migrations: [],
  // subscribers: [],
});

export async function initializeDataSource() {
  if (appDataSource.isInitialized) return appDataSource;
  try {
    const dataSource = await appDataSource.initialize();
    console.log('Data Source [PostgreSQL] has been initialized.');
    return dataSource;
  } catch (err) {
    console.error('Error during Data Source initialization:', err);
    // If the database connection fails, exit the process with an error code
    process.exit(1);
  }
}

export async function disconnectDataSource() {
  if (appDataSource.isInitialized) {
    await appDataSource.destroy();
    console.log('Data Source [PostgreSQL] has been disconnected.');
  }
}
