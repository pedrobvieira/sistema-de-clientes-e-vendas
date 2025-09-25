import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payments/';

const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
};

const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const addPayment = async (paymentData) => {
    const response = await axios.post(API_URL, paymentData, getConfig());
    return response.data;
};

const getPaymentsByClient = async (clientId) => {
    const response = await axios.get(API_URL + clientId, getConfig());
    return response.data;
};

export { addPayment, getPaymentsByClient };