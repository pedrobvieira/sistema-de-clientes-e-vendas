import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ClientDetailsPage from './pages/ClientDetailsPage';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
`;

const App = () => {
  return (
    <AppContainer>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/client/:id" element={<ClientDetailsPage />} />
      </Routes>
    </AppContainer>
  );
};

export default App;