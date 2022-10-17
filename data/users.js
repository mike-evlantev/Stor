import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const users = [
  {
    first: process.env.SEED_ADMIN_FIRST_NAME,
    last: process.env.SEED_ADMIN_LAST_NAME,
    email: process.env.SEED_ADMIN_EMAIL,
    password: bcrypt.hashSync(process.env.SEED_ADMIN_PASSWORD, 10),
    isAdmin: true
  },
  {
    first: "A",
    last: "A",
    email: "a@a.com",
    password: bcrypt.hashSync(process.env.SEED_USER_PASSWORD, 10)
  },
  {
    first: "B",
    last: "B",
    email: "b@b.com",
    password: bcrypt.hashSync(process.env.SEED_USER_PASSWORD, 10)
  },
];

export default users;