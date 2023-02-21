export interface Address {
  _id?: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface User {
  _id?: string;
  name: string;
  email :string;
  username: string;
  password: string;
  addressBook: Address[];
}
