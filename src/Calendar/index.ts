import { ApiResult } from '../../types';
import { convertToUtcDayAndHour } from '../../utils.js';
import { RESERVATION_STATUS_AVAILABLE, RESERVATION_STATUS_BLOCKED } from '../Constants/common';
import axios from '../Services/axios.js';
import { UpdatePresetPriceParams, UpdateUserReservationParams } from './types';

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

// claim certain calendar booking
export const claim = async() => {

}

// claim all calendar bookings
export const claimAll = async() => {

}