import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Context } from './AccountContext';

const AccountDetail = () => {
    const { number, curr } = useParams();
    const context = useContext(Context);
    const account = context.accounts.find(a => a.n === number && a.moneda === curr);
    return(
        <section className='accountInfo'>
            {context.loading ? 
                <>
                    <h4>Consulta de Saldo</h4>
                    <h2 className='mainTitle marginBottom'>Cargando datos</h2>
                    <Link to={'/'} className='exitButton'>
                        <b className='exitButton_text'>Salir</b>
                    </Link>
                </>
                :
                account ?
                    <>
                        <h4>Consulta de Saldo</h4>
                        <h2 className='mainTitle'>Este es tu saldo actual</h2>
                        <article className='accountInfo_fields'>
                            <h3>Saldo de la cuenta: {account.saldo}</h3>
                            <h3>Tipo de cuenta: {account.tipo_letras.match(/^(CA)$/i) ? "Caja de Ahorro" : "Cuenta Corriente"} en {curr === '$' ? "Pesos" : "Dólares"}</h3>
                            <h3>Número de cuenta: {account.n}</h3>
                        </article>
                        <Link to={'/'} className='exitButton'>
                            <b className='exitButton_text'>Salir</b>
                        </Link>
                    </>
                :
                    <>
                        <h4>Consulta de Saldo</h4>
                        <h2 className='mainTitle marginBottom'>La cuenta solicitada no se encontró</h2>
                        <Link to={'/'} className='exitButton'>
                            <b className='exitButton_text'>Salir</b>
                        </Link>
                    </>
            }
        </section>
    )
}

export default AccountDetail;