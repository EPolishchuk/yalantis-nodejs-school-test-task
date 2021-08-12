import { pool } from '../config';
import { QueryResult } from 'pg';

export const addUser = async (userData: UserData) => {
  const { email, firstName, lastName, photo } = userData;
  const accountId: QueryResult = await pool.query(
    'INSERT INTO accounts (email, first_name, last_name, photo) VALUES ($1, $2, $3, $4) RETURNING user_id',
    [email, firstName, lastName, photo]
  );
  let userId = accountId.rows[0]['user_id'];

  return userId;
};

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
}
