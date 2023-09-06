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