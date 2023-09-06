import { clusterApiUrl } from '@solana/web3.js';
import moment, { Moment } from 'moment';

export function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
}

/**
 * Returns the number with 'en' locale settings, ie 1,000
 * @param x number
 * @param minDecimal number
 * @param maxDecimal number
 */
 export function toLocaleDecimal(x: number | string, minDecimal: number, maxDecimal: number) {
    x = Number(x);
    return x.toLocaleString('en', {
        minimumFractionDigits: minDecimal,
        maximumFractionDigits: maxDecimal,
    });
}

/**
 * Runs the function if it's a function, returns the result or undefined
 * @param fn
 * @param args
 */
export const runIfFunction = (fn: any, ...args: any): any | undefined => {
    if(typeof(fn) == 'function'){
        return fn(...args);
    }

    return undefined;
}

/**
 * Returns the ellipsized version of string
 * @param x string
 * @param leftCharLength number
 * @param rightCharLength number
 */
export function ellipsizeThis(x: string, leftCharLength: number, rightCharLength: number) {
    if(!x) {
        return x;
    }

    let totalLength = leftCharLength + rightCharLength;

    if(totalLength >= x.length) {
        return x;
    }

    return x.substring(0, leftCharLength) + "..." + x.substring(x.length - rightCharLength, x.length);
}

/**
 * Returns the new object that has no reference to the old object to avoid mutations.
 * @param obj
 */
export const cloneObj = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * @returns string
 */
export const getRandomColor = () => {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const getRandomNumber = (min: number, max: number, isInteger = false) => {
    let rand = min + (Math.random() * (max - min));
    if(isInteger) {
        rand = Math.round(rand);
    }

    else {
        // to 3 decimals
        rand = Math.floor(rand * 1000) / 1000;
    }

    return rand;
}

export const getRandomChance = () => {
    return getRandomNumber(0, 100);
}

export const getRandomNumberAsString = (min: number, max: number, isInteger = false) => {
    return getRandomNumber(min, max, isInteger).toString();
}

export const getRandomChanceAsString = () => {
    return getRandomNumberAsString(0, 100);
}

export const getUTCMoment = () => {
    return moment().utc();
}

export const getUTCDatetime = () => {
    return getUTCMoment().format('YYYY-MM-DD HH:mm:ss');
}

export const getUTCDate = () => {
    return getUTCMoment().format('YYYY-MM-DD');
}

export const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
}

export const ucFirst = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isWeekend = (moment: Moment) => {
    let day = moment.get('day');
    return day === 5 || day === 6; // friday or saturday
}

// converts the day of week and hour to utc time
export const convertToLocalDayAndHour = (day: number, hour: number) => {
    let hourOffset = moment().utcOffset() / 60;
    hour = hour + hourOffset;
            
    if(hour > 23) {
        day++;
        hour -= 24;
    }

    // 
    day = day > 6? 0 : day;
    return { day, hour };
}

// converts the day of week and hour to the local time
export const convertToUtcDayAndHour = (day: number, hour: number) => {
    let hourOffset = moment().utcOffset() / 60;
    hour = hour - hourOffset;
            
    if(hour < 0) {
        day--;
        hour += 24;
    }

    // 
    day = day < 0? 6 : day;
    return { day, hour };
}