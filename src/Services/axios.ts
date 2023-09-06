import axios from 'axios';
import { SOLLINKED_BACKEND_URL } from '../Constants/common';

export default axios.create({
    baseURL: SOLLINKED_BACKEND_URL,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
    },
    responseType: 'json',
});