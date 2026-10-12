import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IData {
   id : number,
   isCompleted : boolean,
   images : IImages[],
   name : string,
   description : string
}

export interface IImages {
    id : number,
    imageName : string
}


export const usersApi = createApi({
    reducerPath : 'usersApi',
    baseQuery : fetchBaseQuery({baseUrl : 'https://to-dos-api.softclub.tj/api/'}),
    endpoints : (build) => ({
        getUsers : build.query<IData[], void>({
            query : () => 'to-dos',
        }),
        getUserById : build.query<IData, string>({
            query: (id) => `to-dos/${id}`
        }),
        addUser : build.mutation<IData, Omit<IData, any>>({
            query: (body) => ({
                url : 'to-dos',
                method : 'POST',
                body
            }),
        }),
        updateUser : build.mutation<IData, >({
            query : (body) => ({
                url : `to-dos`,
                method : 'PUT',
                body
            }),
        }),
        deleteUser : build.mutation<IData, string>({
            query : (id) => ({
                url : `to-dos?id=${id}`,
                method : 'DELETE'
            }),
        })
    }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;