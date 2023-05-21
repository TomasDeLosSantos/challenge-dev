import React, { useState, useContext } from 'react';
import './AccountButton'
import AccountButton from './AccountButton';
import { Context } from './AccountContext';

const Container = () => {
    const context = useContext(Context);
    const [pageIndex, setPageIndex] = useState(0);
    
    return(
        <section className='accountContainer'>
            <h4>Consulta de Saldo</h4>
                {
                    context.loading ?
                        <h2 className='mainTitle'>Cargando datos</h2>
                    :
                    context.accounts.length > 0 ?
                        <article>
                            <h2 className='mainTitle'>Seleccione la Cuenta a Consultar</h2>
                            <div className='buttonContainer'>
                                {pageIndex > 0 ? 
                                    <button className='pageButton' onClick={() => setPageIndex(pageIndex - 1)}>
                                        {"<<"} Opciones Anteriores
                                    </button> 
                                : <></>}

                                {context.accountsPerPage[pageIndex]?.map(a => <AccountButton key={a.n + a.moneda} type={a.tipo_letras} number={a.n} currency={a.moneda}/>)}

                                {pageIndex + 1 < context.pages ? 
                                    <button className='pageButton' onClick={() => setPageIndex(pageIndex + 1)}>
                                        Más Opciones {">>"}
                                    </button> 
                                : <></>}
                            </div>
                        </article>
                    :
                        <h2 className='mainTitle'>No se encontraron cuentas</h2>
                }
            {context.pages !== 0 ? <h4>{pageIndex + 1}/{context.pages}</h4> : <h4></h4>}
        </section>
    )
}

export default Container;