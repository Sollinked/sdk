import { CreateMailingListParams, UpdateMailingListPriceListParams } from "./types"
import axios from '../Services/axios.js';
import { ApiResult, AuthCallParams } from "../../types";

// get mails
// unused
export const create = async(params: CreateMailingListParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mailingList`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// set tiers
export const updateTiers = async(params: UpdateMailingListPriceListParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mailingList/priceList`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// broadcast
export const newBroadcast = async(params: any) => {
    try {
        return await axios.post<ApiResult<{ mailId: number, depositTo: string }>>(`/broadcast`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}