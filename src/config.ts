import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      url: process.env.DATABASE_URL,
      type: process.env.DATABASE_TYPE,
      extra: process.env.DATABASE_EXTRA,
      dbName: process.env.DATABASE_DB,
      port: parseInt(process.env.DATABASE_PORT, 10),
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
    },
  };
});
