import { AccountModel } from "../models/account-models";

type AuthenticationParams = {
  email: string;
  password: string;
};

export interface Authentication {
  auth(params: Authentication): Promise<AccountModel>;
}
