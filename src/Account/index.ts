import { ApiResult, AuthCallParams } from "../../types";
import { ContentCNFT } from "../ContentPass/types";
import axios from '../Services/axios.js';
import { HomepageUser, PublicUser, User, UserCreateParams, UserUpdateParams, UserUpdateTagParams } from "./types";
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

// get own content pass
export const meContentPasses = async(params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<ContentCNFT[]>>('/user/me/content_passes', params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// get public profile
export const get = async(username: string) => {
    try {
        return await axios.get<ApiResult<PublicUser>>(`/user/username/${username}`);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const search = async(username: string) => {
    try {
        return await axios.get<ApiResult<HomepageUser[]>>(`/user/search/${username}`);
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

// update personal details
export const updateTags = async(id: number, params: UserUpdateTagParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/user/updateTags/${id}`, params);
    }

    catch(e: any) {
        console.log(e);
        return e.response.data as string;
    }
}

// public functions
export const getHomepageUsers = async() => {
    try {
        return await axios.get<ApiResult<HomepageUser[]>>(`/user/homepageUsers`);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}