import axios from 'axios';
import { SOLLINKED_BACKEND_URL } from '../Constants/common.js';

export default axios.create({
    baseURL: SOLLINKED_BACKEND_URL,
    timeout: 30000,
    headers: {
        'Accept': 'application/json',
    },
    responseType: 'json',
});