import { AuthCallParams } from "../../types";

export type MailingList = {
    id: number;
    user_id: number;
    product_id: string;
    wallet_id: string;
    tiers: MailingListPriceTier[];
}

export type MailingListPriceTier = {
    id: number;
    mailing_list_id: number;
    price_id: string;
    paymentlink_id: string;
    name: string;
    description?: string;
    amount: number;
    currency: string;
    charge_every: number;
    prepay_month: number;
    subscriber_count: number;
    is_active: boolean;
}

export type MailingListBroadcast = {
    id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
    execute_at: string;
    is_executing: boolean;
    success_count: number;
    total_count: number;
}

export interface CreateMailingListParams extends AuthCallParams {

}

export interface UpdateMailingListPriceListParams extends AuthCallParams {
    prices: MailingListPriceTier[];
}

export interface BroadcastParams extends AuthCallParams {
    tier_ids: number[];
    title: string;
    content: string;
}

export interface RetryBroadcastParams extends AuthCallParams {

}