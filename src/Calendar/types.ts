import { Moment } from "moment";
import { AuthCallParams } from "../../types";

export type UserReservationSetting = {
    user_id: number;
    day: number;
    hour: number;
    reservation_price: number;
}

export type UserReservation = {
    date: string;
    user_id: number;
    reservation_price?: number;
    reserve_email?: string;
    reserved_at?: string;
    reserve_title?: string;
    tiplink_url?: string;
    tiplink_public_key: string;
    value_usd?: number;
    status: number;
}

export interface UpdateUserReservationParams extends AuthCallParams {
    date: Moment;
    status: "blocked" | "available";
    reservation_price?: number;
}

export interface UpdatePresetPriceParams extends AuthCallParams {
    reservationSettings: UserReservationSetting[]
}

export interface ReserveCalendarParams {
    username: string;
    date: string; // YYYY-MM-DDTHH:mm:ssZ format
    email: string;
    title: string;
}