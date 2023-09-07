import { ReactNode } from "react";
import { User, UserUpdateParams } from "./src/Account/types";
import { UpdateUserReservationParams, UserReservationSetting } from "./src/Calendar/types";
import { CreateGitHubSettingParams, UpdateGitHubSettingParams } from "./src/Github/types";

export type ApiResult<T> = {
    success: boolean;
    message?: string;
    data?: T
}

export type SollinkedProps = {
    address?: string;
    signature?: string;
    message?: string;
}

export interface AuthCallParams {
    address: string;
    signature: string;
    message: string;
}
export interface OptionalAuthCallParams {
    address?: string;
    message?: string;
    signature?: string;
}

export interface PublicCallParams {
    address: string;
}

export type SollinkedContextState = {
    user: User;
    signature: string;
    isVerified: boolean;
    isVerifying: boolean;
    me?: (customSignature?: string) => Promise<string | AxiosResponse<ApiResult<User>, any> | undefined>;
    init?: (customSignature?: string) => Promise<string | AxiosResponse<ApiResult<User>, any> | undefined>;
    createAccount?: (username: string) => Promise<string | AxiosResponse<ApiResult<User>, any> | undefined>;
    updateAccount?: (params: Omit<UserUpdateParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    setMailTiers?: (tiers: MailTier[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    claimMail?: (id: number, claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    claimAllMail?: (claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    setCalendarPresetPrice?: (params: UserReservationSetting[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any>>;
    setCalendarCustomPrice?: (params: Omit<UpdateUserReservationParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any>>;
    createGithubProfile?: (params: Omit<CreateGitHubSettingParams, "address" | "message" | "signature" | "user_id">) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
    updateGithubProfile?: (githubSettingId: number, params: Omit<UpdateGitHubSettingParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
    toggleGitHubProfileStatus?: (githubSettingId: number) => Promise<string | AxiosResponse<ApiResult<string>, any> | undefined>;
    newGithubIssue?: (params: NewGithubIssueParams) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
    deleteGithubProfile?: (githubSettingId: number) => Promise<string | AxiosResponse<any, any> | undefined>;
    getGithubDetails?: (owner: string, repo: string) => Promise<AxiosResponse<ApiResult<{
        tiers: UserGithubTier[];
        address: string; // pay to address
    }>, any>>;
    updateIntegration?: (webhookId: number, params: Omit<UpdateIntegrationParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    testIntegration?: (webhookId: number) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
}

export type ProviderProps = {
    children: ReactNode;
    auth: OptionalAuthCallParams;
}