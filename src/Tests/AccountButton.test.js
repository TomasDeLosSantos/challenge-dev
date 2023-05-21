import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import AccountButton from "../Components/AccountButton";

describe('AccountButton component', () => {
    describe('Accounts in Pesos', () => {
        test('Saving Accounts', () => {
            const number = '123456789123';
            const curr = '$';
            const a = {n: number, moneda: curr, tipo_letras: 'CA' }
            const b = {n: number, moneda: curr, tipo_letras: 'cA' }
            const c = {n: number, moneda: curr, tipo_letras: 'Ca' }
            const d = {n: number, moneda: curr, tipo_letras: 'ca' }
            render(
                <MemoryRouter>
                    <AccountButton key={0} type={a.tipo_letras} number={a.n} currency={a.moneda}/>
                    <AccountButton key={1} type={b.tipo_letras} number={b.n} currency={b.moneda}/>
                    <AccountButton key={2} type={c.tipo_letras} number={c.n} currency={c.moneda}/>
                    <AccountButton key={3} type={d.tipo_letras} number={d.n} currency={d.moneda}/>
                </MemoryRouter>
            );
            expect(screen.getAllByText("Caja de Ahorro en Pesos").length).toEqual(4);
            expect(screen.getAllByText("Nro: 123456789123").length).toEqual(4);
        })

        test('Current Accounts', () => {
            const number = '123456789123';
            const curr = '$';
            const a = {n: number, moneda: curr, tipo_letras: 'CC' }
            const b = {n: number, moneda: curr, tipo_letras: 'cC' }
            const c = {n: number, moneda: curr, tipo_letras: 'Cc' }
            const d = {n: number, moneda: curr, tipo_letras: 'cc' }
            render(
                <MemoryRouter>
                    <AccountButton key={0} type={a.tipo_letras} number={a.n} currency={a.moneda}/>
                    <AccountButton key={1} type={b.tipo_letras} number={b.n} currency={b.moneda}/>
                    <AccountButton key={2} type={c.tipo_letras} number={c.n} currency={c.moneda}/>
                    <AccountButton key={3} type={d.tipo_letras} number={d.n} currency={d.moneda}/>
                </MemoryRouter>
            );
            expect(screen.getAllByText("Cuenta Corriente en Pesos").length).toEqual(4);
            expect(screen.getAllByText("Nro: 123456789123").length).toEqual(4);
        })
    })

    describe('Accounts in Dolars', () => {
        test('Saving Accounts', () => {
            const number = '123456789123';
            const curr = 'u$s';
            const a = {n: number, moneda: curr, tipo_letras: 'CA' }
            const b = {n: number, moneda: curr, tipo_letras: 'cA' }
            const c = {n: number, moneda: curr, tipo_letras: 'Ca' }
            const d = {n: number, moneda: curr, tipo_letras: 'ca' }
            render(
                <MemoryRouter>
                    <AccountButton key={0} type={a.tipo_letras} number={a.n} currency={a.moneda}/>
                    <AccountButton key={1} type={b.tipo_letras} number={b.n} currency={b.moneda}/>
                    <AccountButton key={2} type={c.tipo_letras} number={c.n} currency={c.moneda}/>
                    <AccountButton key={3} type={d.tipo_letras} number={d.n} currency={d.moneda}/>
                </MemoryRouter>
            );
            expect(screen.getAllByText("Caja de Ahorro en Dólares").length).toEqual(4);
            expect(screen.getAllByText("Nro: 123456789123").length).toEqual(4);
        })

        test('Current Accounts', () => {
            const number = '123456789123';
            const curr = 'u$s';
            const a = {n: number, moneda: curr, tipo_letras: 'CC' }
            const b = {n: number, moneda: curr, tipo_letras: 'cC' }
            const c = {n: number, moneda: curr, tipo_letras: 'Cc' }
            const d = {n: number, moneda: curr, tipo_letras: 'cc' }
            render(
                <MemoryRouter>
                    <AccountButton key={0} type={a.tipo_letras} number={a.n} currency={a.moneda}/>
                    <AccountButton key={1} type={b.tipo_letras} number={b.n} currency={b.moneda}/>
                    <AccountButton key={2} type={c.tipo_letras} number={c.n} currency={c.moneda}/>
                    <AccountButton key={3} type={d.tipo_letras} number={d.n} currency={d.moneda}/>
                </MemoryRouter>
            );
            expect(screen.getAllByText("Cuenta Corriente en Dólares").length).toEqual(4);
            expect(screen.getAllByText("Nro: 123456789123").length).toEqual(4);
        })
    })
})