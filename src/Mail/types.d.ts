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