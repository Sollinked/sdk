import { CreateMailingListParams, MailingList, UpdateMailingListPriceListParams } from "./types"
import axios from '../Services/axios.js';
import { ApiResult } from "../../types";


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
export const newBroadcast = async(params: any) => {
    try {
        return await axios.post<ApiResult<{ mailId: number, depositTo: string }>>(`/broadcast`, params);
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