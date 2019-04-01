import * as bcrypt from 'bcryptjs';
import { User } from '../users/types';
import { addUser, findUser } from '../users/repository';
export { getUser } from '../users/repository';

export const authenticate = async (username: string, password: string): Promise<User> => {
  const user = await findUser(username);
  if (user && bcrypt.compareSync(password, user.hash)) {
    return user;
  }
  throw new Error('Credential mismatch');
};

export const register = async (username: string, password: string): Promise<User> => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  return addUser(username, hash);
};
