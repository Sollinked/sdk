import { ContentPassCreateParams, ContentPassUpdateParams } from "./types"
import axios from '../Services/axios.js';
import { ApiResult, AuthCallParams } from "../../types";


// create a new content
export const create = async(params: ContentPassCreateParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/contentPass`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}


export const update = async(id: number, params: ContentPassUpdateParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/contentPass/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}