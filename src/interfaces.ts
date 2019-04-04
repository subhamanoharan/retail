export interface IItem {
  name: string;
  sp: number;
  barcode: string;
}

export interface IUser {
  name: string;
  password: string;
}

export interface IUserSession {
  id: number;
  name: string;
}
