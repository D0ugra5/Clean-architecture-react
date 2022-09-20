import { AccountModel } from "../models/account-models";

export type AuthenticationParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(params: Authentication): Promise<AccountModel>;
}
