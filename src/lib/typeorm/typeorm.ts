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
  ssl: env.DATABASE_SSL === 'true' ? true : false,
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

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
