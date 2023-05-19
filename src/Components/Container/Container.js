import React, { useState, useEffect, useContext } from 'react';
import '../AccountButton/AccountButton'
import AccountButton from '../AccountButton/AccountButton';
import { Context } from '../AccountContext/AccountContext';



const Container = () => {
    const context = useContext(Context);
    const [pageIndex, setPageIndex] = useState(0);
    
    return(
        <section className='accountContainer'>
            <article>
                <h4>Consulta de Saldo</h4>
                <h2>Seleccione la Cuenta a Consultar</h2>
                <div className='buttonContainer'>
                    {pageIndex > 0 ? 
                        <button className='pageButton' onClick={() => setPageIndex(pageIndex - 1)}>
                            {"<<"} Opciones Anteriores
                        </button> : <></>}
                    {context.accountsPerPage[pageIndex]?.map(a => <AccountButton key={a.n + a.moneda} type={a.tipo_letras} number={a.n} currency={a.moneda}/>)}
                    {pageIndex + 1 < context.pages ? 
                        <button className='pageButton' onClick={() => setPageIndex(pageIndex + 1)}>
                            Más Opciones {">>"}
                        </button> : <></>}
                </div>
            </article>

            {context.pages !== 0 ? <h4>{pageIndex + 1}/{context.pages}</h4> : <h4></h4>}
        </section>
    )
}

export default Container;