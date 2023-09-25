import { ReactNode } from "react";
import { HomepageUser, PublicUser, User, UserUpdateParams } from "./src/Account/types";
import { UpdateIntegrationParams } from "./src/Integration/types";
import { ReserveCalendarParams, UpdateUserReservationParams, UserReservation, UserReservationSetting } from "./src/Calendar/types";
import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams, UserGithubTier } from "./src/Github/types";
import { AxiosResponse } from "axios";
import { MailTier, NewMailParams, OnMailPaymentParams } from "./src/Mail/types";
import { BroadcastParams, MailingList, UpdateMailingListPriceListParams } from "./src/MailingList/types";

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
        getHomepageUsers: () => Promise<string | HomepageUser[]>;
        get: (username: string) => Promise<string | PublicUser>;
        search: (username: string) => Promise<string | HomepageUser[]>;
    },
    mail?: {
        setTiers: (tiers: MailTier[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        claim: (id: number, claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        claimAll: (claimToAddress?: string) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        new: (toUsername: string, params: NewMailParams) => Promise<string | {
            mailId: number;
            depositTo: string;
        } | undefined>;
        onPayment: (toUsername: string, params: OnMailPaymentParams) => Promise<string | undefined>;
    },
    mailingList?: {
        create: () => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        updateTiers: (id: number, params: Omit<UpdateMailingListPriceListParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        get: (username: string) => Promise<string | {
            list: MailingList | undefined;
            display_name: string;
        }>;
        retry: (id: number) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        broadcast: (params: Omit<BroadcastParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    }
    calendar?: {
        setPresetPrice: (reservationSettings: UserReservationSetting[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        setCustomPrice: (params: Omit<UpdateUserReservationParams, "address" | "message" | "signature">) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        get: (username: string) => Promise<string | {
            reservations: UserReservation[] | undefined;
            settings: UserReservationSetting[];
            display_name: string;
            calendar_advance_days: number;
        }>;
        reserve: (params: ReserveCalendarParams) => Promise<string | {
            value_usd: number;
            public_key: string;
            uuid: string;
        }>;
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