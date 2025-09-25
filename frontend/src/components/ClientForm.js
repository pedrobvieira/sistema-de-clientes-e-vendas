import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

const ClientForm = ({ onAdd, onUpdate, clientToEdit }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (clientToEdit) {
      setName(clientToEdit.name);
    } else {
      setName('');
    }
  }, [clientToEdit]);

   const handleSubmit = (e) => {
    e.preventDefault();
    if (clientToEdit) {
      onUpdate(clientToEdit._id, { name });
    } else {
      onAdd({ name });
    }
    setName(''); 
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>{clientToEdit ? 'Editar Cliente' : 'Adicionar Cliente'}</h3>
      <Input
        type="text"
        placeholder="Nome do Cliente"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit">{clientToEdit ? 'Atualizar' : 'Adicionar'}</Button>
    </FormContainer>
  );
};

export default ClientForm;