import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ClientList, ClientForm, Header } from '../components';
import clientService from '../services/clientService';
import productService from '../services/productService'; // Importar o serviço de produto

const DashboardContainer = styled.div`
  padding: 2rem;
  padding-top: 5rem;
  text-align: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Title = styled.h1`
  color: #333;
`;

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [monthlyProfit, setMonthlyProfit] = useState({}); // Novo estado para o lucro por mês
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      fetchClients();
      fetchMonthlyProfit();
    }
  }, [navigate]);

  const fetchClients = async () => {
    try {
      const data = await clientService.getClients();
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const fetchMonthlyProfit = async () => {
    try {
      const allClients = await clientService.getClients();
      const allProducts = [];
      for (const client of allClients) {
        const products = await productService.getProductsByClient(client._id);
        allProducts.push(...products);
      }

      const profitByMonth = allProducts.reduce((acc, product) => {
        const month = new Date(product.dataVenda).toLocaleString('default', { month: 'long', year: 'numeric' });
        const profit = product.valorVendido - product.precoCusto;
        acc[month] = (acc[month] || 0) + profit;
        return acc;
      }, {});
      setMonthlyProfit(profitByMonth);
    } catch (error) {
      console.error('Erro ao calcular lucro mensal:', error);
    }
  };

  const handleAddClient = async (clientData) => {
    try {
      await clientService.addClient(clientData);
      fetchClients();
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error.response?.data?.message);
    }
  };

  const handleUpdateClient = async (id, clientData) => {
    try {
      await clientService.updateClient(id, clientData);
      setClientToEdit(null);
      fetchClients();
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error.response?.data?.message);
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await clientService.deleteClient(id);
      fetchClients();
    } catch (error) {
      console.error('Erro ao deletar cliente:', error.response?.data?.message);
    }
  };

  const handleEditClient = (client) => {
    setClientToEdit(client);
  };

  const handleSelectClient = (client) => {
    navigate(`/client/${client._id}`);
  };

  return (
    <>
      <Header />
      <DashboardContainer>
        <Content>
          <Title>Gerenciar Clientes</Title>
          <ClientForm
            onAdd={handleAddClient}
            onUpdate={handleUpdateClient}
            clientToEdit={clientToEdit}
          />
          <ClientList
            clients={clients}
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
            onSelectClient={handleSelectClient}
          />

          <div style={{ marginTop: '2rem' }}>
            <h2>Relatórios de Lucro</h2>
            {Object.keys(monthlyProfit).length > 0 ? (
              <ul>
                {Object.entries(monthlyProfit).map(([month, profit]) => (
                  <li key={month}>
                    {month}: R$ {profit.toFixed(2)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum dado de lucro disponível.</p>
            )}
          </div>
        </Content>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;