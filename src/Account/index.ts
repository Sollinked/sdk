import { ApiResult, AuthCallParams } from "../../types";
import axios from '../Services/axios';
import { PublicUser, User, UserCreateParams, UserUpdateParams } from "./types";
import _ from 'lodash';

// register account
export const create = async(params: UserCreateParams) => {
    try {
        return await axios.post<ApiResult<User>>('/user', params);
    }

    catch(e: any) {
        console.log(e);
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

        let omitted = _(params).omit("id").value();
        let formData = new FormData();
        for(let [key, value] of Object.entries(omitted)) {
            // social is not needed
            if(key === "social") {
                continue;
            }

            // omit address
            if(value === null) {
                continue;
            }

            if(value === undefined) {
                continue;
            }

            if(typeof value === "number") {
                value = value.toString();
            }

            formData.append(key, value as string | Blob);
        }
        
        return await axios<ApiResult<undefined>>({
            url: `/user/update/${id}`,
            method: 'POST',
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }

    catch(e: any) {
        return e.response.data as string;
    }
}