import React, { useState } from 'react';
import { format } from 'date-fns'
import './styles.css';

/**
 * Componente React para buscar informações de endereço.
 *
 * @component
 */
const AddressComponent = () => {
    const [address, setAddress] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);


     /**
     * Função assíncrona para buscar informações de endereço.
     *
     * @async
     * @function
     */
    const fetchAddress = async () => {
        // Verificar se o campo de endereço está vazio
        if (!address.trim()) {
            setError('Endereço não pode estar vazio');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/address?address=${address}`);
            const data = await response.json();

            // Verificar se a resposta contém a propriedade results e se results[0] existe
            if (data.results && data.results[0]) {
                // Adicione a data e hora da consulta à resposta antes de definir o estado result
                const dataHoraConsulta = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
                const resultWithDateTime = { ...data, dataHoraConsulta };
                setResult(resultWithDateTime);
                setError(null);  // Limpar o estado de erro se a resposta for válida
            } else {
                // Caso a resposta não seja válida, defina o estado result como null e exiba a mensagem de erro
                setResult(null);
                setError('Endereço inválido');
                console.error('Resposta inválida da API:', data);
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            setError('Erro ao processar a solicitação');
        }
    };

    /**
     * Função para renderizar os resultados na interface.
     *
     * @function
     * @returns {JSX.Element | null} Elemento JSX contendo os resultados ou null se não houver resultados.
     */
    const renderResults = () => {
        if (error) {
            return <div className="error-message">{error}</div>;
        }

        if (!result) {
            return null; // Não mostrar nada se não houver resultados ainda
        }

        return (
            <div className="result-container">
                <div className="data-hora-consulta">Data e Hora da Consulta: {result.dataHoraConsulta}</div>
                <div className="formatted-address">{result.results[0].formatted_address}</div>
                <div className="geometry">
                    <div className="location">
                        Coordenadas: {result.results[0].geometry.location.lat}, {result.results[0].geometry.location.lng}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="input-group">
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Digite o endereço" />
                <button onClick={fetchAddress}>Buscar Endereço</button>
            </div>
            <div className="response">{renderResults()}</div>
        </div>
    );
};

export default AddressComponent;
