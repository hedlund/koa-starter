export type UserID = number;

export interface User {
  id: UserID;
  username: string;
  hash: string;
}
