import { ApiResult, AuthCallParams } from "../../types";
import axios from '../Services/axios';
import { PublicUser, User, UserCreateParams, UserUpdateParams } from "./types";

// register account
export const create = async(params: UserCreateParams) => {
    try {
        return await axios.post<ApiResult<User>>('/user', params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// get own profile
export const me = async(params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<User>>('/user/me', params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// get public profile
export const get = async({ username }: { username: string }) => {
    try {
        return await axios.get<ApiResult<PublicUser>>(`/user/username/${username}`);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// update personal details
export const update = async(id: number, params: UserUpdateParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/user/update/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}