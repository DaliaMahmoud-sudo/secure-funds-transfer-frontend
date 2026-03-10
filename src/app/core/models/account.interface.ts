
export interface Account {

  user: User;
  accountNumber: string;
  balance: number;

}
export interface User {
  id: number;
  username: string;
  password: string;
}
