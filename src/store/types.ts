import { ILoginState } from "./login/types";

export interface IRootState {
  name: string;
  age: number;
}

interface IRootWithModules {
  login: ILoginState;
}

export type IStoreType = IRootState & IRootWithModules;
