import { AuthCallParams } from "../../types";

export type MailAuction = {
    id: number;
    user_id: number;
    start_date: string;
    min_bid: number;
    end_date: string;
    created_at: string;
    winner_count: number;
}

export type ProcessedMailAuction = MailAuction & {
    stats?: AuctionStats;
}

export type PublicMailAuction = {
    id: number;
    display_name: string;
    profile_picture?: string;
    start_date: number; // unix
    end_date: number; // unix
    min_bid: number;
    winner_count: number;
}

export type PublicMailAuctionWithBidder = {
    id: number;
    display_name: string;
    profile_picture?: string;
    start_date: number; // unix
    end_date: number; // unix
    min_bid: number;
    winner_count: number;

    bidders: PublicBidder[];
}

export type MailBid = {
    id: number;
    auction_id: number;
    user_id: number;
    tiplink_url: string;
    tiplink_public_key: string;
    value_usd: number;
    subject: string;
    message: string; // in html
    is_success: boolean;
    created_at: string;
    updated_at: string;
}

export type PublicBidder = {
    display_name: string;
    profile_picture?: string;
    value_usd: number;
}

export type AuctionStats = {
    highest_bid: number;
    bid_count: number;
}

export type OwnPreviousBid = { 
    message: string;
    subject: string; 
    value_usd: number;
}

export interface AuctionCreateParams extends AuthCallParams {
    start_date: number; // unix
    end_date: number; // unix
    min_bid: number;
    winner_count: number;
}

export interface AuctionUpdateParams extends AuthCallParams {
    start_date: number; // unix
    end_date: number; // unix
    min_bid: number;
    winner_count: number;
}

export interface AuctionDeleteParams extends AuthCallParams {
}

export interface AuctionBidParams extends AuthCallParams {
    subject: string;
    emailMessage: string;
    bidderEmail?: string;
}