import { AuthCallParams } from "../../types";
import { UserReservation, UserReservationSetting } from "../Calendar/types";
import { UserGithubSetting } from "../Github/types";
import { Mail, MailTier } from "../Mail/types";

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
    reservations?: UserReservation[];
    reservationSettings?: UserReservationSetting[];
    // webhooks?: Webhook[]; -- not now
    githubSettings?: UserGithubSetting[];
}

export interface UserCreateParams extends AuthCallParams {
    username: string;
}

export interface UserUpdateParams extends AuthCallParams {
    username?: string;
    calendar_advance_days?: number;
    display_name?: string;
    email_address?: string;
    profile_picture?: Blob;
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
}