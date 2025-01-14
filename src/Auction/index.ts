import { PublicMailAuction, AuctionCreateParams, AuctionUpdateParams, AuctionDeleteParams, PublicMailAuctionWithBidder, AuctionBidParams, OwnPreviousBid } from "./types"
import axios from '../Services/axios.js';
import { ApiResult, AuthCallParams } from "../../types";


// create a new content
export const create = async(params: AuctionCreateParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/auction`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const update = async(id: number, params: AuctionUpdateParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/auction/update/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const cancel = async(id: number, params: AuctionDeleteParams) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/auction/delete/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// get public content
export const get = async(id: number) => {
    try {
        let res = await axios.get<ApiResult<PublicMailAuctionWithBidder>>(`/auction/${id}`);
        if(!res.data.success) {
            return res.data.message ?? "Error";
        }
    
        if(!res.data.data) {
            return "Empty";
        }
    
        return res.data.data;
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const getPreviousBid = async(id: number, params: AuthCallParams) => {
    try {
        let res = await axios.post<ApiResult<OwnPreviousBid>>(`/auction/previousBid/${id}`, { ...params });
        if(!res.data.success) {
            return res.data.message ?? "Error";
        }
    
        if(!res.data.data) {
            return "Empty";
        }
    
        return res.data.data;
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// displays the latest published contents
export const getLive = async() => {
    try {
        let res = await axios.get<ApiResult<PublicMailAuctionWithBidder[]>>(`/auction/live`);
        if(!res.data.success) {
            return res.data.message ?? "Error";
        }
    
        if(!res.data.data) {
            return "Empty";
        }
    
        return res.data.data;
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

export const bid = async(id: number, params: AuctionBidParams) => {
    try {
        // returns deposit address
        return await axios.post<ApiResult<string>>(`/auction/bid/${id}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}