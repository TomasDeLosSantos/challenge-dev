import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useParams } from 'react-router-dom';
import { Context } from "../Components/AccountContext";
import Container from "../Components/Container";


describe('Container component', () => {
    test('Data loaded and three account pages', () => {
        const a = [
            {n: '123456789120', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789120', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789121', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789121', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789122', moneda: '$', tipo_letras: 'CA', saldo: '0' }
        ];
        const b = [
            {n: '123456789122', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789123', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789123', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789124', moneda: '$', tipo_letras: 'CA', saldo: '0' }
        ];
        const c = [
            {n: '123456789124', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789125', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789125', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789126', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789126', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
        ]
        
        render(
            <Context.Provider value={ 
                {accounts: [...a, ...b, ...c], 
                accountsPerPage: [a, b, c],
                pages: 3,
                loading: false} }>
                <MemoryRouter>
                    <Container/>
                </MemoryRouter>
            </Context.Provider>
        )
        const button = screen.getByText(/Más Opciones/);
        expect(screen.getAllByText(/Nro/).length).toEqual(5);
        fireEvent.click(button);
        expect(screen.getAllByText(/Nro/).length).toEqual(4);
        fireEvent.click(button);
        expect(screen.getAllByText(/Nro/).length).toEqual(5);

    })

    test('Data loaded and one account page', () => {
        const a = [
            {n: '123456789120', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789120', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789121', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789121', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789122', moneda: '$', tipo_letras: 'CA', saldo: '0' },
            {n: '123456789122', moneda: 'u$s', tipo_letras: 'CA', saldo: '0' }
        ];
        render(
            <Context.Provider value={ 
                {accounts: a, 
                accountsPerPage: [a],
                pages: 1,
                loading: false} }>
                <MemoryRouter>
                    <Container/>
                </MemoryRouter>
            </Context.Provider>
        )
        expect(screen.getAllByText(/Nro/).length).toEqual(6);
    })
    
    test('Data loaded and no accounts', () => {
        render(
            <Context.Provider value={ {accounts: [], loading: false} }>
                <Container/>
            </Context.Provider>
        )
        expect(screen.getByText('No se encontraron cuentas')).toBeInTheDocument();
    })

    test('Data is loading', () => {
        render(
            <Context.Provider value={ {loading: true} }>
                <Container/>
            </Context.Provider>
        )
        expect(screen.getByText('Cargando datos')).toBeInTheDocument();
    })
})
