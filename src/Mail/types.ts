import { AuthCallParams } from "../../types";

export type MailTier = {
    value_usd: number;
    respond_days: number;
}

export type Mail = {
    key: number;
    user_id: number;
    from_email: string;
    to_email: string;
    bcc_to_email?: string;
    message_id: string;
    tiplink_url: string;
    tiplink_public_key: string;
    is_processed: boolean;
    has_responded: boolean;
    is_claimed: boolean;
    created_at: string;
    processed_at?: string;
    value_usd?: number;
    expiry_date?: string;
    claim_balance_verify_count: number;
    subject?: string;
    is_from_site: boolean;
    from_user_id?: number;
    message?: string;
    reply_message?: string;
    responded_at?: string;
}

export type ThreadMail = {
    id: number;
    created_at: string;
    responded_at?: string;
    subject?: string;
    message?: string; // in html
    reply_message?: string; // in html
    value_usd?: number;
    tiplink_url?: string; // will have value if the mail expired
    tiplink_public_key: string;
    is_processed: boolean;
}

export type MailPaymentResponse = {
    tiplink_public_key: string;
    is_processed: boolean;
    tiers: MailTier[];
    username: string;
    display_name?: string;
    is_verified: boolean;
    holiday_mode: boolean;
}

export type GetMailParams = {
    type: "claimed" | "unclaimed" | "expired" | "pending_deposit" | "pending_response" | "claimable" | "all";
}

export interface UpdateMailTierParams extends AuthCallParams {
    tiers: MailTier[];
}
export interface ClaimSpecificMailParams extends AuthCallParams {
    mailId: number;
    claimToAddress?: string;
}
export interface ClaimAllMailParams extends AuthCallParams {
    claimToAddress?: string;
}

export interface NewMailParams extends AuthCallParams {
    subject: string;
    emailMessage: string;
}
export interface OnMailPaymentParams {
    replyToEmail: string;
    subject: string;
    message: string;
    txHash: string;
    mailId: number;
}