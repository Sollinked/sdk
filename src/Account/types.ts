import { AuthCallParams } from "../../types";
import { MailAuction, ProcessedMailAuction } from "../Auction/types";
import { UserReservation, UserReservationSetting } from "../Calendar/types";
import { Content } from "../Content/types";
import { ContentPass } from "../ContentPass/types";
import { UserGithubSetting } from "../Github/types";
import { Webhook } from "../Integration/types";
import { Mail, MailTier } from "../Mail/types";
import { MailingList, MailingListBroadcast, MailingListSubscriber } from "../MailingList/types";

export type User = {
    id: number;
    address: string;
    username: string;
    calendar_advance_days: number;
    display_name: string;
    email_address: string;
    profile_picture: string;
    facebook: string;
    instagram: string;
    twitter: string;
    twitch: string;
    tiktok: string;
    youtube: string;
    tiers?: MailTier[];
    mails?: Mail[];
    mailingList?: MailingList;
    broadcasts?: MailingListBroadcast[];
    subscriptions?: MailingListSubscriber[];
    reservations?: UserReservation[];
    reservationSettings?: UserReservationSetting[];
    contents?: Content[];
    contentPasses?: ContentPass[];
    webhooks?: Webhook[];
    githubSettings?: UserGithubSetting[];
    is_verified: boolean;
    holiday_mode: boolean;
    tags?: UserTag[];
    auctions?: ProcessedMailAuction[];
    is_auto_auction: boolean;
    auto_auction_duration: number;
    auto_auction_start_bid: number;
    auto_auction_winner_count: number;
}

export interface UserCreateParams extends AuthCallParams {
    username: string;
}

export interface UserUpdateParams extends AuthCallParams {
    username?: string;
    calendar_advance_days?: number;
    display_name?: string;
    email_address?: string;
    profile_picture?: File;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    twitch?: string;
    tiktok?: string;
    youtube?: string;
}

export interface UserUpdateTagParams extends AuthCallParams {
    tags: string[];
    hash: string;
}

export type PublicUser = {
    id: number;
    username: string;
    display_name: string;
    profile_picture?: string;
    facebook: string;
    instagram: string;
    twitter: string;
    twitch: string;
    tiktok: string;
    youtube: string;
    calendar_advance_days: number;
    tiers?: MailTier[];
    mailingList?: MailingList;
    contents?: Content[];
    contentPasses?: ContentPass[];
    is_verified: boolean;
    holiday_mode: boolean;
    tags?: UserTag[];
    auction_id?: number;
}

export type HomepageUser = {
    id: number;
    username: string;
    display_name: string;
    profile_picture?: string;
    value_usd: number;
    is_verified: boolean;
    holiday_mode: boolean;
    tags?: UserTag[];
    auction_id?: number;
}

export type UserTag = {
    user_id: number;
    name: string;
}