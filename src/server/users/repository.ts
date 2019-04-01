import knex from '../db';
import { User, UserID } from './types';

export const getUser = async (id: UserID): Promise<User> => {
  return await knex('users').where({ id }).first();
};

export const findUser = async (username: string): Promise<User> => {
  return await knex('users').where({ username }).first();
};

export const addUser = async (username: string, hash: string): Promise<User> => {
  return await knex('users').insert({ username, hash }).returning('*');
};
