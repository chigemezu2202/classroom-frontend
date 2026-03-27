// import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// import { API_URL } from "./constants";
// export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
//   apiURL: API_URL,
// });

import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import { MOCK_SUBJECTS } from "../constants/mock-data";

export const dataProvider: DataProvider = {
  getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
    console.log("getList called with:", { resource });
    if (resource !== "subjects") return { data: [] as TData[], total: 0, };

    return {
      data: MOCK_SUBJECTS as unknown as TData[],
      total: MOCK_SUBJECTS.length,
    };
  },

  getOne: async () => { throw new Error("getOne not implemented"); },
  getMany: async () => { throw new Error("getMany not implemented"); },
  create: async () => { throw new Error("create not implemented"); },
  update: async () => { throw new Error("update not implemented"); },
  deleteOne: async () => { throw new Error("deleteOne not implemented"); },
  deleteMany: async () => { throw new Error("deleteMany not implemented"); },

  getApiUrl: () => '',
};