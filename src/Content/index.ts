import { Content, ContentCreateParams, ContentUpdateParams } from "./types"
import axios from '../Services/axios.js';
import { ApiResult, AuthCallParams, OptionalAuthCallParams } from "../../types";


// create a new content
export const create = async(params: ContentCreateParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/content`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}


export const update = async(id: number, params: ContentUpdateParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/content/update/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const publish = async(id: number, params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/content/publish/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const unpublish = async(id: number, params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/content/unpublish/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const getDraft = async(id: number, params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<Content>>(`/content/draft/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// get public content
export const get = async(username: string, slug: string, auth: OptionalAuthCallParams) => {
    try {
        let res = await axios.post<ApiResult<{
                                    content?: Content;
                                    display_name: string;
                                }>>(`/content/public/${username}/${slug}`, { ...auth });
        if(!res.data.success) {
            return res.data.message ?? "Error";
        }
    
        if(!res.data.data) {
            return "Empty";
        }
    
        let {
            content,
            display_name,
        } = res.data.data;
    
        return {
            content,
            display_name,
        };
    }

    catch(e: any) {
        return e.response.data as string;
    }
}