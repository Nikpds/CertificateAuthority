import { notification } from 'antd';
import LocalStorage from '../services/LocalStorage';
export const  api = 'http://11.1.9.96:64331/api/'
const callFetch = async (url, method, data) => {

    const result = await (await fetch(api + url, {
        method: method,
        headers: headers(),
        body: data ? JSON.stringify(data) : null
    }).then(async res => {
        if (res.ok) {
            return res.json();
        } else {
            const message = await res.json();
            notification['error']({
                message: 'Σφάλμα',
                description: message.Message
            });
            return null;
        }
    }).catch(() => {
        // to do error handling
    }));

    return result;
}
export default callFetch;

const headers = () => {
    const h = new Headers();
    h.append('Content-Type', 'application/json');
    const token = LocalStorage.get('token');
    if (token) {
        h.append('Authorization', `Bearer ${token}`);
    }
    return h;
}
