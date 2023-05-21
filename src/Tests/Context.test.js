import { render, screen } from "@testing-library/react";
import { Context } from "../Components/AccountContext";
import TestComponent from "../Components/TestComponent";

const accountPages = [
    [{n: '123456789123', id:0}, {n: '123456789123', id:1}, {n: '123456789123', id:2}, {n: '123456789123', id:3}, {n: '123456789123', id:4}],
    [{n: '123456789123', id:5}, {n: '123456789123', id:6}, {n: '123456789123', id:7}, {n: '123456789123', id:8}, {n: '123456789123', id:9}]
]

describe('Context tests', () => {
    test('Initial Values', () => {
        render(
            <Context.Provider value={ {accounts: [], accountsPerPage: [], pages: 0} }>
                <TestComponent/>
            </Context.Provider>
        )
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('no accounts')).toBeInTheDocument();
        expect(screen.getByText('no pages')).toBeInTheDocument();
    })

    test('Mock Data: 1 account page', () => {
        render(
            <Context.Provider value={ {
                accounts: accountPages[0], 
                accountsPerPage: [accountPages[0]], 
                pages: 1
            } }>
                <TestComponent/>
            </Context.Provider>
        )
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getAllByText('account').length).toEqual(5);
        expect(screen.getAllByText('page').length).toEqual(1);
    })

    test('Mock Data: 2 account page', () => {
        render(
            <Context.Provider value={ {
                accounts: [...accountPages[0], ...accountPages[1]], 
                accountsPerPage: accountPages, 
                pages: 2
            } }>
                <TestComponent/>
            </Context.Provider>
        )
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getAllByText('account').length).toEqual(10);
        expect(screen.getAllByText('page').length).toEqual(2);
    })
})