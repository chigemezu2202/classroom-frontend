import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/types";
import { CreateDataProviderOptions, createDataProvider } from "@refinedev/rest";

if (!BACKEND_BASE_URL) {
  throw new Error("BACKEND_BASE_URL is not defined in environment variables. Pls set VITE_BACKEND_BASE_URL in your .env file.");
}


const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,

    buildQueryParams: async ({resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;

      const params: Record<string, string|number> = {
        page,
        limit: pageSize
      };

      filters?.forEach((filter) => {
        const field = 'field' in filter ? filter.field : '';

        const value = String(filter.value);

        if (resource === 'subjects') {
          if (field === 'department') params.department = value;
          if (field === 'name' || field === 'description') params.search = value;
        }
      })
      return params;
    },

    mapResponse: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.data ?? [];
    },

    getTotalCount: async (response) => {
      const payload: ListResponse = await response.clone().json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    }
  }
}

const { dataProvider, kyInstance } = createDataProvider(
  BACKEND_BASE_URL,
  options
);

export { dataProvider, kyInstance };


// import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
// import { MOCK_SUBJECTS } from "../constants/mock-data";

// export const dataProvider: DataProvider = {
//   getList: async <TData extends BaseRecord = BaseRecord>({ resource }: GetListParams): Promise<GetListResponse<TData>> => {
//     console.log("getList called with:", { resource });
//     if (resource !== "subjects") return { data: [] as TData[], total: 0, };

//     return {
//       data: MOCK_SUBJECTS as unknown as TData[],
//       total: MOCK_SUBJECTS.length,
//     };
//   },

//   getOne: async () => { throw new Error("getOne not implemented"); },
//   getMany: async () => { throw new Error("getMany not implemented"); },
//   create: async () => { throw new Error("create not implemented"); },
//   update: async () => { throw new Error("update not implemented"); },
//   deleteOne: async () => { throw new Error("deleteOne not implemented"); },
//   deleteMany: async () => { throw new Error("deleteMany not implemented"); },

//   getApiUrl: () => '',
// };