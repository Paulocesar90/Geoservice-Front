import React, { useState } from 'react';
import { format } from 'date-fns'
import './styles.css';

/**
 * Componente React para buscar informações de coordenadas.
 *
 * @component
 */
const CoordinatesComponent = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [result, setResult] = useState(null);


     /**
     * Função assíncrona para buscar informações de coordenadas.
     *
     * @async
     * @function
     */
    const fetchCoordinates = async () => {
        try {
            const response = await fetch(`http://localhost:8080/coordinates?latitude=${latitude}&longitude=${longitude}`);
            const data = await response.json();

            // Adicione a data e hora da consulta à resposta antes de definir o estado result
            const dataHoraConsulta = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
            const resultWithDateTime = { ...data, dataHoraConsulta };

            setResult(resultWithDateTime);
        } catch (error) {
            console.error('Erro ao buscar coordenadas:', error);
        }
    };

    /**
     * Função para renderizar os resultados na interface.
     *
     * @function
     * @returns {JSX.Element | null} Elemento JSX contendo os resultados ou null se não houver resultados.
     */
    const renderResults = () => {
        if (!result || !result.results || result.results.length === 0) return null;

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
                <input type="text" placeholder="Latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                <input type="text" placeholder="Longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                <button onClick={fetchCoordinates}>Buscar Coordenadas</button>
            </div>
            <div className="response">{renderResults()}</div>
        </div>
    );
};

export default CoordinatesComponent;
