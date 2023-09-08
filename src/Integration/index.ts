import { ApiResult, AuthCallParams } from '../../types';
import axios from '../Services/axios.js';
import { UpdateIntegrationParams } from './types';

// set custom price
/* export const create = async(params: CreateIntegrationParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/webhooks`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
} */

// sets the calendar's tiers
export const update = async(id: number, params: UpdateIntegrationParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/webhooks/update/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}
// sets the calendar's tiers
export const test = async(id: number, params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/webhooks/test/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}