import { ClaimAllMailParams, ClaimSpecificMailParams, NewMailParams, OnMailPaymentParams, UpdateMailTierParams } from "./types"
import axios from '../Services/axios.js';
import { ApiResult } from "../../types";

// get mails
// unused
export const get = async() => {

}

// set tiers
export const setTiers = async(id: number, params: UpdateMailTierParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/user/updateTiers/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// claim responded mails
export const claim = async(id: number, params: ClaimSpecificMailParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/user/claim/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }

}

// claim all responded mails
export const claimAll = async(id: number, params: ClaimAllMailParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/user/claimAll/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }

}


//public function
//first step of new mail
export const newMail = async(toUsername: string, params: NewMailParams) => {
    try {
        return await axios.post<ApiResult<{ mailId: number, depositTo: string }>>(`/mail/new/${toUsername}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}
// second step of new mail
export const onMailPayment = async(toUsername: string, params: OnMailPaymentParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/mail/payment/${toUsername}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}