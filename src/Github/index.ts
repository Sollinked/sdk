import { ApiResult } from "../../types";
import { CreateGitHubSettingParams, UpdateGitHubSettingParams } from "./types";
import axios from '../Services/axios';

// creates github setting
export const create = async(params: CreateGitHubSettingParams) => {
    try {
        return await axios.post<ApiResult<string>>(`/gitgud/new`, params);
    }

    catch(e: any) {
        return e.response;
    }
}

// set setting tiers
export const update = async(settingId: number, params: UpdateGitHubSettingParams) => {
    try {
        return await axios.post<ApiResult<string>>(`/gitgud/update/${settingId}`, params);
    }

    catch(e: any) {
        return e.response;
    }
}

// opens new issue
export const newIssue = async(params: CreateGitHubSettingParams) => {
    try {
        return await axios.post<ApiResult<string>>(`/gitgud/newIssue`, params);
    }

    catch(e: any) {
        return e.response;
    }
}