import { ReactNode } from "react";
import { User, UserUpdateParams } from "./src/Account/types";
import { UpdateIntegrationParams } from "./src/Integration/types";
import { UpdateUserReservationParams, UserReservationSetting } from "./src/Calendar/types";
import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams, UserGithubTier } from "./src/Github/types";
import { AxiosResponse } from "axios";
import { MailTier } from "./src/Mail/types";

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
    init?: (customSignature?: string) => Promise<User | undefined>;
    account?: {
        me: (customSignature?: string) => Promise<User | undefined>;
        create: (username: string) => Promise<User | undefined>;
        update: (params: Omit<UserUpdateParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    },
    mail?: {
        setTiers: (tiers: MailTier[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        claim: (id: number, claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        claimAll: (claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    },
    calendar?: {
        setPresetPrice: (reservationSettings: UserReservationSetting[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        setCustomPrice: (params: Omit<UpdateUserReservationParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    },
    github?: {
        create: (params: Omit<CreateGitHubSettingParams, "address" | "message" | "signature" | "user_id">) => Promise<string | AxiosResponse<ApiResult<string>, any> | undefined>;
        update: (githubSettingId: number, params: Omit<UpdateGitHubSettingParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<string>, any> | undefined>;
        toggle: (githubSettingId: number) => Promise<string | AxiosResponse<ApiResult<string>, any> | undefined>;
        newIssue: (params: NewGithubIssueParams) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
        delete: (githubSettingId: number) => Promise<string | AxiosResponse<any, any> | undefined>;
        get: (owner: string, repo: string) => Promise<AxiosResponse<ApiResult<{
            tiers: UserGithubTier[];
            address: string; // pay to address
        }>, any>>;
    },
    integration?: {
        update: (webhookId: number, params: Omit<UpdateIntegrationParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        test: (webhookId: number) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    }
}

export type ProviderProps = {
    children: ReactNode;
    auth: OptionalAuthCallParams;
}