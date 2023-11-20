import axios from 'axios';
import { apiUrl } from '@/config';

async function getApiVersion() {
    try {
        const response = await axios.get(`${apiUrl}/version`);
        
        return response.data;
    }
    catch(error) {
        alert('Something went wrong when getting version!');
    }
}

export { getApiVersion };