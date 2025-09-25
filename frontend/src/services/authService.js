import axios from 'axios';

const API_URL = 'https://sistema-de-clientes-api.onrender.com/api/auth/';

// Função para registrar um usuário
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Função para fazer login
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;