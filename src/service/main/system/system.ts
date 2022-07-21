import hyRequest from "@/service";
import { IDataType } from "@/service/login/type";

export function getPageListData(pageUrl: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: pageUrl,
    data: queryInfo,
  });
}
export function deletePageData(url: string) {
  // url -> /user/4
  return hyRequest.delete<IDataType>({
    url: url,
  });
}

export function createPageData(url: string, newData: any) {
  //  url ->  /users
  return hyRequest.post<IDataType>({
    url,
    data: newData,
  });
}

export function editPageData(url: string, newData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: newData,
  });
}
