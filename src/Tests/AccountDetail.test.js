import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from 'react-router-dom';
import { Context } from "../Components/AccountContext";
import AccountDetail from "../Components/AccountDetail";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}))


describe('AccountDetail component', () => {
    test('Data loaded and account exists', () => {
        useParams.mockReturnValue({ number: '123456789123', curr: '$' });
        const a = {n: '123456789123', moneda: '$', tipo_letras: 'CA', saldo: '0' };
        render(
            <Context.Provider value={ {accounts: [a], loading: false} }>
                <MemoryRouter>
                    <AccountDetail/>
                </MemoryRouter>
            </Context.Provider>
        )
        expect(screen.getByText('Saldo de la cuenta: 0')).toBeInTheDocument();
        expect(screen.getByText('Tipo de cuenta: Caja de Ahorro en Pesos')).toBeInTheDocument();
        expect(screen.getByText('Número de cuenta: 123456789123')).toBeInTheDocument();
    })
    
    test('Data loaded and account does not exist', () => {
        useParams.mockReturnValue({ number: '123456789123', curr: '$' });
        const a = {n: '', moneda: '$', tipo_letras: 'CA', saldo: '0' };
        render(
            <Context.Provider value={ {accounts: [a], loading: false} }>
                <MemoryRouter>
                    <AccountDetail/>
                </MemoryRouter>
            </Context.Provider>
        )
        expect(screen.getByText('La cuenta solicitada no se encontró')).toBeInTheDocument();
    })

    test('Data is loading', () => {
        useParams.mockReturnValue({ number: '123456789123', curr: '$' });
        const a = {n: '123456789123', moneda: '$', tipo_letras: 'CA', saldo: '0' };
        render(
            <Context.Provider value={ {accounts: [a], loading: true} }>
                <MemoryRouter>
                    <AccountDetail/>
                </MemoryRouter>
            </Context.Provider>
        )
        expect(screen.getByText('Cargando datos')).toBeInTheDocument();
    })
})