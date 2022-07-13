import hyRequest from "@/service";
import { IDataType } from "@/service/login/type";

export function getPageListData(pageUrl: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: pageUrl,
    data: queryInfo,
  });
}
