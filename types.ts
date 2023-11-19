import { ReactNode } from "react";
import { HomepageUser, PublicUser, User, UserUpdateParams, UserUpdateTagParams } from "./src/Account/types";
import { UpdateIntegrationParams } from "./src/Integration/types";
import { ReserveCalendarParams, UpdateUserReservationParams, UserReservation, UserReservationSetting } from "./src/Calendar/types";
import { CreateGitHubSettingParams, NewGithubIssueParams, UpdateGitHubSettingParams, UserGithubTier } from "./src/Github/types";
import { AxiosResponse } from "axios";
import { MailTier, NewMailParams, OnMailPaymentParams } from "./src/Mail/types";
import { BroadcastParams, DraftParams, MailingList, MailingListBroadcast, ResendBroadcastParams, UpdateMailingListPriceListParams } from "./src/MailingList/types";
import { Content, ContentCreateParams, ContentPayParams, ContentUpdateParams } from "./src/Content/types";
import { ContentCNFT, ContentPassCreateParams, ContentPassPayParams, ContentPassUpdateParams } from "./src/ContentPass/types";

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
        meContentPasses: () => Promise<string | ContentCNFT[] | undefined>;
        create: (username: string) => Promise<User | undefined>;
        update: (params: Omit<UserUpdateParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        updateTags: (params: Omit<UserUpdateTagParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        getHomepageUsers: () => Promise<string | HomepageUser[]>;
        get: (username: string) => Promise<string | PublicUser>;
        search: (username: string) => Promise<string | HomepageUser[]>;
        searchAddress: (address: string) => Promise<string | HomepageUser>;
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
        updateTiers: (id: number, params: Omit<UpdateMailingListPriceListParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        get: (username: string) => Promise<string | {
            list: MailingList | undefined;
            display_name: string;
        }>;
        retry: (id: number) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        resend: (params: Omit<ResendBroadcastParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        broadcast: (params: Omit<BroadcastParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        saveDraft: (params: Omit<BroadcastParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<number>, any> | undefined>;
        updateDraft: (id: number, params: Omit<DraftParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        testDraft: (id: number, params: Omit<BroadcastParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        broadcastDraft: (id: number, params: Omit<BroadcastParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        getDraft: (id: number) => Promise<string | AxiosResponse<ApiResult<MailingListBroadcast>, any> | undefined>;
    },
    content?: {
        create: (params: Omit<ContentCreateParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        update: (id: number, params: Omit<ContentUpdateParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        publish: (id: number) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        unpublish: (id: number) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        getDraft: (id: number) => Promise<string | AxiosResponse<ApiResult<Content>, any> | undefined>;
        get: (username: string, slug: string) => Promise<string | Content>;
        pay: (id: number, params: Omit<ContentPayParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<Content>, any> | undefined>;
    },
    contentPass?: {
        create: (params: Omit<ContentPassCreateParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        update: (id: number, params: Omit<ContentPassUpdateParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        pay: (id: number, params: Omit<ContentPassPayParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    },
    calendar?: {
        setPresetPrice: (reservationSettings: UserReservationSetting[]) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        setCustomPrice: (params: Omit<UpdateUserReservationParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
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
        create: (params: Omit<CreateGitHubSettingParams, keyof AuthCallParams | "user_id">) => Promise<string | AxiosResponse<ApiResult<string>, any> | undefined>;
        update: (githubSettingId: number, params: Omit<UpdateGitHubSettingParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<string>, any> | undefined>;
        toggle: (githubSettingId: number) => Promise<string | AxiosResponse<ApiResult<string>, any> | undefined>;
        newIssue: (params: NewGithubIssueParams) => Promise<string | AxiosResponse<ApiResult<string>, any>>;
        delete: (githubSettingId: number) => Promise<string | AxiosResponse<any, any> | undefined>;
        get: (owner: string, repo: string) => Promise<AxiosResponse<ApiResult<{
            tiers: UserGithubTier[];
            address: string; // pay to address
        }>, any>>;
    },
    integration?: {
        update: (webhookId: number, params: Omit<UpdateIntegrationParams, keyof AuthCallParams>) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
        test: (webhookId: number) => Promise<string | AxiosResponse<ApiResult<undefined>, any> | undefined>;
    }
}

export type ProviderProps = {
    children: ReactNode;
    auth: OptionalAuthCallParams;
}