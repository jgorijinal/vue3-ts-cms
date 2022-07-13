import { ILoginState } from "./login/types";
import { ISystemState } from "./main/system/types";

export interface IRootState {
  name: string;
  age: number;
}

interface IRootWithModules {
  login: ILoginState;
  system: ISystemState;
}

export type IStoreType = IRootState & IRootWithModules;
