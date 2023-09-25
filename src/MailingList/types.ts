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

export interface CreateMailingListParams extends AuthCallParams {

}

export interface UpdateMailingListPriceListParams extends AuthCallParams {
    prices: MailingListPriceTier[];
}