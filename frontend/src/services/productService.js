import axios from 'axios';

const API_URL = 'https://sistema-de-clientes-api.onrender.com/api/products/';

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

// Adicionar um novo produto a um cliente
const addProduct = async (productData) => {
    const response = await axios.post(API_URL, productData, getConfig());
    return response.data;
};

// Obter todos os produtos de um cliente
const getProductsByClient = async (clientId) => {
    const response = await axios.get(API_URL + clientId, getConfig());
    return response.data;
};

// Atualizar um produto
const updateProduct = async (id, productData) => {
    const response = await axios.put(API_URL + id, productData, getConfig());
    return response.data;
};

// Deletar um produto
const deleteProduct = async (id) => {
    const response = await axios.delete(API_URL + id, getConfig());
    return response.data;
};

const productService = {
    addProduct,
    getProductsByClient,
    updateProduct,
    deleteProduct,
};

export default productService;