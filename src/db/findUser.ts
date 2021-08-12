import { pool } from '../config';
import { QueryResult } from 'pg';

const NO_USER = "User doesn't exist";

export const userExist = async (email: string) => {
  const userFound: QueryResult = await pool.query(
    'SELECT email FROM accounts WHERE email = $1',
    [email]
  );

  return userFound.rows.length > 0;
};

export const findUser = async (id: string) => {
  const userFound: QueryResult = await pool.query(
    'SELECT * FROM accounts WHERE user_id = $1',
    [id]
  );

  let isUserExist = userFound.rows.length > 0;
  if (isUserExist) {
    return userFound.rows[0];
  } else {
    throw new Error(NO_USER);
  }
};
