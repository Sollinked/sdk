import { AuthCallParams } from "../../types";

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