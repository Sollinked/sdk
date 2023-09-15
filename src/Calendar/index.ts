import { ApiResult } from '../../types';
import { convertToLocalDayAndHour, convertToUtcDayAndHour } from '../../utils.js';
import { RESERVATION_STATUS_AVAILABLE, RESERVATION_STATUS_BLOCKED } from '../Constants/common.js';
import axios from '../Services/axios.js';
import { ReserveCalendarParams, UpdatePresetPriceParams, UpdateUserReservationParams, UserReservation, UserReservationSetting } from './types';

// sets the calendar's tiers
export const setPresetPrice = async(id: number, params: UpdatePresetPriceParams) => {
    try {
        let reservationSettings = params.reservationSettings ??[];
        reservationSettings.forEach((setting, index) => {
            let {day, hour} = convertToUtcDayAndHour(setting.day, setting.hour);
            reservationSettings[index].day = day;
            reservationSettings[index].hour = hour;
        });
        return await axios.post<ApiResult<undefined>>(`/user/updateReservationSettings/${id}`, {...params, reservationSettings});
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// set custom price
export const setCustomPrice = async(params: UpdateUserReservationParams) => {
    try {
        let date = params.date.format('YYYY-MM-DDTHH:mm:ssZ');
        let status = params.status === "blocked"? RESERVATION_STATUS_BLOCKED : RESERVATION_STATUS_AVAILABLE;
        return await axios.post<ApiResult<undefined>>(`/reservation/update`, {
            ...params,
            date,
            status,
        });
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

// get user's reservation settings for frontend booking purposes
// all date values are set to local time
export const getUserSettings = async(username: string) => {
    try {
        let res = await axios.get<ApiResult<{
                                    reservations?: UserReservation[];
                                    settings?: UserReservationSetting[];
                                    display_name: string;
                                    calendar_advance_days: number;
                                }>>(`/reservation/${username}`);
        if(!res.data.success) {
            return res.data.message ?? "Error";
        }
    
        if(!res.data.data) {
            return "Empty";
        }
    
        let {
            reservations,
            settings,
            display_name,
            calendar_advance_days,
        } = res.data.data;
    
        settings = settings ?? [];
        settings.forEach((setting, index) => {
            let { day, hour } = convertToLocalDayAndHour(setting.day, setting.hour);
            settings![index].day = day;
            settings![index].hour = hour;
        });
    
        return {
            reservations,
            settings,
            display_name,
            calendar_advance_days
        };
    }

    catch(e: any) {
        return e.response.data as string;
    }
}

//reserve user's timeslot
export const reserve = async({ username, date, email, title }: ReserveCalendarParams) => {
    let res = await axios.post<ApiResult<{ public_key:string; value_usd: number; uuid: string; }>>(`/reservation/new/${username}`, {
        date,
        email,
        title,
    });

    if(!res.data.success || !res.data.data) {
        return res.data.message ?? 'Unable to schedule the meeting';
    }

    return {
        value_usd: res.data.data.value_usd,
        public_key: res.data.data.public_key,
        uuid: res.data.data.uuid,
    };
}

// claim certain calendar booking
export const claim = async() => {

}

// claim all calendar bookings
export const claimAll = async() => {

}