export interface IItem {
  name: string;
  sp: number;
  barcode: string;
  category?: string;
  byWeight?: boolean;
  tax_percent?: number;
}

export interface IUserCreds {
  name: string;
  password: string;
}

export interface IUserSession {
  id: number;
  name: string;
}

export interface IUser {
  id: number;
  name: string;
  role: string;
}
