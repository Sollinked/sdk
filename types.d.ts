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
    signature?: string;
    message?: string;
}

export interface PublicCallParams {
    address: string;
}

export type SollinkedContextState = {
    user?: User,
    updateAccount?: (params: Omit<UserUpdateParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    setMailTiers?: (tiers: MailTier[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    claimMail?: (id: number, claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    claimAllMail?: (claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    setCalendarPresetPrice?: (params: UserReservationSetting[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any>>;
    setCalendarCustomPrice?: (params: UpdateUserReservationParams) => Promise<string | AxiosResponse<ApiResult<undefined>, any>>;
    newGithubProfile?: (params: CreateGitHubSettingParams) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
    updateGithubProfile?: (githubSettingId: number, params: UpdateGitHubSettingParams) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
    newGithubIssue?: (params: NewGithubIssueParams) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
}

export type ProviderProps = {
    children: ReactNode;
    auth: OptionalAuthCallParams;
}