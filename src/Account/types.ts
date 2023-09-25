import { AuthCallParams } from "../../types";
import { UserReservation, UserReservationSetting } from "../Calendar/types";
import { UserGithubSetting } from "../Github/types";
import { Webhook } from "../Integration/types";
import { Mail, MailTier } from "../Mail/types";
import { MailingList, MailingListBroadcast } from "../MailingList/types";

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
    reservations?: UserReservation[];
    reservationSettings?: UserReservationSetting[];
    webhooks?: Webhook[];
    githubSettings?: UserGithubSetting[];
    is_verified: boolean;
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
    is_verified: boolean;
}

export type HomepageUser = {
    username: string;
    display_name: string;
    profile_picture?: string;
    value_usd: number;
    is_verified: boolean;
}