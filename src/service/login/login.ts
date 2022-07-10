import hyRequest from "../index";
import { IAccount } from "./type";
import { IDataType } from "./type";
import { ILoginResult } from "./type";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法: /users/1
  userMenus = "/role/", // 用法 : /role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  });
}

export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.userMenus + id + "/menu",
    showLoading: false,
  });
}
