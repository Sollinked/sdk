import { ApiResult } from '../../types';
import { RESERVATION_STATUS_AVAILABLE, RESERVATION_STATUS_BLOCKED } from '../Constants/common';
import axios from '../Services/axios';
import { UpdateUserReservationParams, UserReservation, UserReservationSetting } from './types';

// sets the calendar's tiers
export const setPresetPrice = async(id: number, params: UserReservationSetting[]) => {
    try {
        return await axios.post<ApiResult<undefined>>(`/user/updateReservationSettings/${id}`, params);
    }

    catch(e: any) {
        return e.response;
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
        return e.response;
    }
}

// claim certain calendar booking
export const claim = async() => {

}

// claim all calendar bookings
export const claimAll = async() => {

}