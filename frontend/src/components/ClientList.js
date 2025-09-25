import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ClientItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ClientName = styled.span`
  font-size: 1.1rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 1rem;
  transition: color 0.2s;

  &:hover {
    color: #0056b3;
  }
`;

const ClientList = ({ clients, onEdit, onDelete, onSelectClient }) => {
  return (
    <ListContainer>
      <h3>Meus Clientes</h3>
      <ul>
        {clients.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          clients.map((client) => (
            <ClientItem key={client._id}>
              <ClientName onClick={() => onSelectClient(client)}>
                {client.name}
              </ClientName>
              <ButtonGroup>
                <IconButton onClick={() => onEdit(client)}>
                  <FaEdit />
                </IconButton>
                <IconButton onClick={() => onDelete(client._id)}>
                  <FaTrash />
                </IconButton>
              </ButtonGroup>
            </ClientItem>
          ))
        )}
      </ul>
    </ListContainer>
  );
};

export default ClientList;