import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const PageContainer = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LinkStyled = styled(Link)`
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

   const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.register({ email, password });
      console.log('Usuário registrado com sucesso!', user);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido';
      console.error('Erro no registro:', errorMessage);
      alert('Erro no registro: ' + errorMessage);
    }
  };

  return (
    <PageContainer>
      <Title>Cadastro</Title>
      <Form onSubmit={submitHandler}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Registrar</Button>
      </Form>
      <LinkStyled to="/login">Já tem uma conta? Faça login</LinkStyled>
    </PageContainer>
  );
};

export default RegisterPage;