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
      // try to get a new token
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

        // store the new token
        // Merge with existing user data to avoid losing profile info
        const updatedUser = { ...user, ...newData };
        setItemToStorage('user', updatedUser);

        // Use updateUser for partial update of tokens instead of login which replaces entire state
        api.dispatch(updateUser(newData));

        // retry the initial query
        console.log("Retrying initial request...");
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Token refresh failed, logging out...");
        api.dispatch(logout());
        removeItem('user');
      }
    } else {
      console.log("No refresh token available, logging out...");
      api.dispatch(logout());
      removeItem('user');
    }
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "RecentGames"],
  endpoints: (_) => ({}),
});
