import axios from 'axios';
import { apiUrl } from '@/utils/config';

async function getApiVersion() {
    return getData('version');
}

async function getMatchList() {
    return getData('v1/getAllMatches', true);
}

async function getAccessToken() {
    return getData('v1/getAccessToken');
}

async function getData(url, shouldAuthenticate = false) {
    try {
        let accessToken = '';
        if (shouldAuthenticate) {
            const tokenData = await getAccessToken();

            if (!tokenData.access_token)
                throw 'Unsuccessful access token fetch';

            accessToken = tokenData.access_token;
        }

        const response = await axios.get(`${apiUrl}/${url}`, shouldAuthenticate ? { headers: { get: { 'Authorization': `Bearer ${accessToken}` } } } : null);

        if (response.data.success !== undefined && response.data.success !== true)
            throw `Unsuccessful request for URL: ${url}`;
        
        return response.data;
    }
    catch(error) {
        alert(`Something went wrong when getting URL: ${url}!`);
        console.error(error);
    }
}

export { getApiVersion, getMatchList };