import { BroadcastParams, CreateMailingListParams, DraftParams, MailingList, MailingListBroadcast, RetryBroadcastParams, UpdateMailingListPriceListParams } from "./types"
import axios from '../Services/axios.js';
import { ApiResult, AuthCallParams } from "../../types";


// create a new mailing list product
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
export const broadcast = async(params: BroadcastParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mailingList/broadcast`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const retry = async(id: number, params: RetryBroadcastParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mailingList/retry/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const saveDraft = async(params: DraftParams) => {
    try {
        return await axios.post<ApiResult<number>>(`/mailingList/saveDraft`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const updateDraft = async(id: number, params: DraftParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mailingList/updateDraft/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}
export const testDraft = async(id: number, params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mailingList/testDraft/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const broadcastDraft = async(id: number, params: BroadcastParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mailingList/broadcastDraft/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const getDraft = async(id: number, params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<MailingListBroadcast>>(`/mailingList/draft/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// get user
export const get = async(username: string) => {
    try {
        let res = await axios.get<ApiResult<{
                                    list?: MailingList;
                                    display_name: string;
                                }>>(`/mailingList/${username}`);
        if(!res.data.success) {
            return res.data.message ?? "Error";
        }
    
        if(!res.data.data) {
            return "Empty";
        }
    
        let {
            list,
            display_name,
        } = res.data.data;
    
        return {
            list,
            display_name,
        };
    }

    catch(e: any) {
        return e.response.data as string;
    }
}