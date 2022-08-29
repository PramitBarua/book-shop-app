import dotenv from 'dotenv';

dotenv.config({
  path: `${process.env.NODE_ENV}.env`
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  PASSWORD: process.env.PASSWORD || null,
  DATABASE: process.env.DATABASE || null,
};
