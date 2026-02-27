import { type BaseQueryFn, type FetchArgs, type FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getItemFromStorage, setItemToStorage, removeItem } from "../../../utils/localstorage.utils";
// import type { User } from "../../../types/user.types";
import { logout, updateUser } from "../slices/auth.slice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL + 'api/',
  prepareHeaders: async (headers: Headers) => {
    const user = await getItemFromStorage<any>('user');
    const accessToken = user?.accessToken || user?.data?.accessToken;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("401 Unauthorized detected, attempting to refresh token...");
    const user = await getItemFromStorage<any>('user');
    const refreshToken = user?.refreshToken || user?.data?.refreshToken;

    if (refreshToken) {
      console.log("Refresh token found, calling refresh-token API...");

      const refreshResult = await baseQuery(
        {
          url: 'refresh-token',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        console.log("Token refresh successful!");
        const newData = (refreshResult.data as any).data || refreshResult.data;


        const updatedUser = { ...user, ...newData };
        setItemToStorage('user', updatedUser);

        api.dispatch(updateUser(newData));

        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logout());
        removeItem('user');
      }
    } else {
      api.dispatch(logout());
      removeItem('user');
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "RecentGames", "Games", "Notifications"],
  endpoints: (_) => ({}),
});
