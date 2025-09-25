import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components';
import productService from '../services/productService';
import clientService from '../services/clientService';
import { addPayment, getPaymentsByClient } from '../services/paymentService';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PageContainer = styled.div`
  padding: 2rem;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const BackButton = styled.button`
  background: #f0f2f5;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1rem;
  align-self: flex-start;
  transition: background-color 0.3s;
  &:hover {
    background-color: #ddd;
  }
`;

const ProductForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormButton = styled.button`
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
`;

const ProductItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductInfo = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

const ProductValue = styled.span`
  font-weight: bold;
  color: #007bff;
`;

const PaymentDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const TotalValue = styled.h4`
  color: #28a745;
  margin: 0;
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const PaymentsSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PaymentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PaymentItem = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
`;

const PaymentFormSection = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
`;

const ClientDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState(null);
    const [products, setProducts] = useState([]);
    const [payments, setPayments] = useState([]);
    const [productForm, setProductForm] = useState({
        name: '', unidade: '', precoCusto: '', valorVendido: '', dataVenda: '', anotacao: '', // Adicionado
    });
    const [productToEdit, setProductToEdit] = useState(null);
    const [paymentForm, setPaymentForm] = useState({ valor: '', dataPagamento: '' });
    const [totalSum, setTotalSum] = useState(0);
    const [totalLucro, setTotalLucro] = useState(0); // Novo estado

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const fetchedClients = await clientService.getClients();
                const clientData = fetchedClients.find(c => c._id === id);
                setClient(clientData);

                const fetchedProducts = await productService.getProductsByClient(id);
                setProducts(fetchedProducts);

                const fetchedPayments = await getPaymentsByClient(id);
                setPayments(fetchedPayments);

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
        fetchClientData();
    }, [id]);

    useEffect(() => {
        const sumVendido = products.reduce((acc, product) => acc + product.valorVendido, 0); // Cálculo do valor vendido
        const sumCusto = products.reduce((acc, product) => acc + product.precoCusto, 0); // Cálculo do custo
        const lucro = sumVendido - sumCusto; // Cálculo do lucro
        
        setTotalSum(sumVendido);
        setTotalLucro(lucro);
    }, [products]);

    const handleFormChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...productForm, clientId: id };
            if (productToEdit) {
                await productService.updateProduct(productToEdit._id, dataToSend);
            } else {
                await productService.addProduct(dataToSend);
            }
            setProductForm({ name: '', unidade: '', precoCusto: '', valorVendido: '', dataVenda: '', anotacao: '' });
            setProductToEdit(null);
            const updatedProducts = await productService.getProductsByClient(id);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await productService.deleteProduct(productId);
            const updatedProducts = await productService.getProductsByClient(id);
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
        }
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        try {
            await addPayment({
                clientId: id,
                valor: parseFloat(paymentForm.valor),
                dataPagamento: paymentForm.dataPagamento
            });
            setPaymentForm({ valor: '', dataPagamento: '' });
            const updatedPayments = await getPaymentsByClient(id);
            setPayments(updatedPayments);
        } catch (error) {
            console.error('Erro ao adicionar pagamento:', error);
        }
    };

    if (!client) {
        return <p>Carregando...</p>;
    }

    const totalPago = payments.reduce((acc, payment) => acc + payment.valor, 0);
    const valorRestante = totalSum - totalPago;

    return (
        <>
            <Header />
            <PageContainer>
                <BackButton onClick={() => navigate('/')}>&larr; Voltar para Clientes</BackButton>
                <Content>
                    <Title>Produtos de {client.name}</Title>
                    <ProductForm onSubmit={handleAddOrUpdateProduct}>
                        <FormInput type="text" name="name" placeholder="Nome do Produto" value={productForm.name} onChange={handleFormChange} required />
                        <FormInput type="text" name="unidade" placeholder="Unidade" value={productForm.unidade} onChange={handleFormChange} />
                        <FormInput type="number" name="precoCusto" placeholder="Preço de Custo" value={productForm.precoCusto} onChange={handleFormChange} required />
                        <FormInput type="number" name="valorVendido" placeholder="Valor Vendido" value={productForm.valorVendido} onChange={handleFormChange} required />
                        <FormInput type="date" name="dataVenda" value={productForm.dataVenda} onChange={handleFormChange} required />
                        <FormInput type="text" name="anotacao" placeholder="Anotação" value={productForm.anotacao} onChange={handleFormChange} />
                        <FormButton type="submit">{productToEdit ? 'Atualizar Produto' : 'Adicionar Produto'}</FormButton>
                    </ProductForm>

                    <ProductList>
                        {products.map(product => (
                            <ProductItem key={product._id}>
                                <ProductDetails>
                                    <p>{product.name} ({product.unidade}) - <ProductValue>R$ {product.valorVendido.toFixed(2)}</ProductValue></p>
                                    <ProductInfo>Custo: R$ {product.precoCusto.toFixed(2)}</ProductInfo>
                                    <ProductInfo>Lucro: R$ {(product.valorVendido - product.precoCusto).toFixed(2)}</ProductInfo>
                                    <ProductInfo>Vend. em: {new Date(product.dataVenda).toLocaleDateString()}</ProductInfo>
                                    {product.anotacao && <ProductInfo>Obs: {product.anotacao}</ProductInfo>}
                                </ProductDetails>
                                <div>
                                    <FormButton onClick={() => setProductToEdit(product)}><FaEdit /></FormButton>
                                    <FormButton onClick={() => handleDeleteProduct(product._id)}><FaTrash /></FormButton>
                                </div>
                            </ProductItem>
                        ))}
                    </ProductList>
                    
                    <PaymentsSection>
                        <Title>Pagamentos</Title>
                        <PaymentFormSection onSubmit={handleAddPayment}>
                            <FormInput
                                type="number"
                                placeholder="Valor a Pagar"
                                value={paymentForm.valor}
                                onChange={(e) => setPaymentForm({ ...paymentForm, valor: e.target.value })}
                                required
                            />
                            <FormInput
                                type="date"
                                value={paymentForm.dataPagamento}
                                onChange={(e) => setPaymentForm({ ...paymentForm, dataPagamento: e.target.value })}
                                required
                            />
                            <FormButton type="submit">Adicionar Pagamento</FormButton>
                        </PaymentFormSection>
                        <PaymentList>
                            {payments.map(payment => (
                                <PaymentItem key={payment._id}>
                                    <span>Pagamento de <ProductValue>R$ {payment.valor.toFixed(2)}</ProductValue></span>
                                    <span>{new Date(payment.dataPagamento).toLocaleDateString()}</span>
                                </PaymentItem>
                            ))}
                        </PaymentList>
                    </PaymentsSection>

                    <TotalValue>
                        <span>Total Geral (Vendido): R$ {totalSum.toFixed(2)}</span>
                        <span>Total Pago: R$ {totalPago.toFixed(2)}</span>
                        <span>Restante: R$ {valorRestante.toFixed(2)}</span>
                    </TotalValue>
                    <TotalValue>
                        <span>Total de Lucro: R$ {totalLucro.toFixed(2)}</span>
                    </TotalValue>
                </Content>
            </PageContainer>
        </>
    );
};

export default ClientDetailsPage;