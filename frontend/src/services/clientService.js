import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clients/';

// Pegar o token do usuário logado
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user.token : null;
};

// Configurar o cabeçalho de autorização
const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Adicionar um novo cliente
const addClient = async (clientData) => {
  const response = await axios.post(API_URL, clientData, getConfig());
  return response.data;
};

// Obter todos os clientes do usuário
const getClients = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data;
};

// Atualizar um cliente
const updateClient = async (id, clientData) => {
  const response = await axios.put(API_URL + id, clientData, getConfig());
  return response.data;
};

// Deletar um cliente
const deleteClient = async (id) => {
  const response = await axios.delete(API_URL + id, getConfig());
  return response.data;
};

const clientService = {
  addClient,
  getClients,
  updateClient,
  deleteClient,
};

export default clientService;