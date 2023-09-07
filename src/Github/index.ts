import { ApiResult, AuthCallParams } from "../../types";
import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams, UserGithubTier } from "./types";
import axios from '../Services/axios';

// creates github setting
export const create = async(params: CreateGitHubSettingParams) => {
    try {
        return await axios.post<ApiResult<string>>(`/gitgud/new`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// set setting tiers
export const update = async(settingId: number, params: UpdateGitHubSettingParams) => {
    try {
        return await axios.post<ApiResult<string>>(`/gitgud/update/${settingId}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// toggle github status
export const toggle = async(settingId: number, params: AuthCallParams) => {
    try {
        return await axios.post<ApiResult<string>>(`/gitgud/toggle/${settingId}`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// delete github setting
export const del = async(settingId: number, params: AuthCallParams) => {
    try {
        return  await axios({
            url: `/gitgud/${settingId}`,
            method: 'DELETE',
            data: params,
        });
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

//public functions
export const get = async(owner: string, repo: string) => {
    return await axios.get<ApiResult<{ tiers: UserGithubTier[], address: string }>>(`/gitgud/tiers/${owner}/${repo}`);
}

// opens new issue
export const newIssue = async(params: NewGithubIssueParams) => {
    try {
        return await axios.post<ApiResult<string>>(`/gitgud/newIssue`, params);
    }

    catch(e: any) {
        return e.response.data as string;
    }
}