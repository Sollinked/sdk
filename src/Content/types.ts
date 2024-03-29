import { AuthCallParams } from "../../types";
import { PublicUser } from "../Account/types";
import { ContentPass } from "../ContentPass/types";

export type ContentStatus = 'draft' | 'published';

export type Content = {
    id: number;
    user_id: number;
    content_pass_ids: number[];
    content: string;
    title: string;
    slug: string;
    description: string;
    value_usd: number;
    is_free: boolean;
    status: ContentStatus;
    deleted_at?: string;
    updated_at: string;
    paymentlink_id?: string;

    // generated
    contentPasses?: ContentPass[];
}

export type LatestContent = {
    id: number;
    user_id: number;
    content_pass_ids: number[];
    content: string;
    title: string;
    slug: string;
    description: string;
    value_usd: number;
    is_free: boolean;
    status: ContentStatus;
    deleted_at?: string;
    updated_at: string;
    paymentlink_id?: string;

    // generated
    contentPasses?: ContentPass[];
    user?: {
        username: string;
        display_name: string;
    };
}

export interface ContentCreateParams extends AuthCallParams {
    content_pass_ids: number[];
    content: string;
    title: string;
    description: string;
    value_usd: number;
    status: ContentStatus;
}

export interface ContentUpdateParams extends AuthCallParams {
    content_pass_ids: number[];
    content: string;
    title: string;
    description: string;
    value_usd: number;
}

export interface ContentPayParams extends AuthCallParams {
    txHash: string;
}