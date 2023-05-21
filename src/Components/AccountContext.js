import React, { useState, useEffect } from "react";
export const Context = React.createContext([]);

const AccountContext = ({ defaultValue = [], children }) => {
    // Array con todas las cuentas disponibles
    const [accounts, setAccounts] = useState(defaultValue);
    // Array de las cuentas a mostrar por página en el menú (Array de arrays)
    const [accountsPerPage, setAccountsPerPage] = useState(defaultValue);
    // Cantidad de páginas a mostrar en el menú
    const [pages, setPages] = useState(0);
    // Determina que los datos de la api ya fueron cargados
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchData = await fetch('https://api.npoint.io/97d89162575a9d816661');
                const data = await fetchData.json();
                /*
                Filtro las cuentas tal que:
                    - moneda = {'$', 'u$s'}
                    - n es una string con 12 caracteres numéricos
                    - saldo es una string que representa un numero entero o con punto flotante, positivo o negativo
                    - tipo_letras = {'CA', 'CC'} (o alguna otra variante de las strings combinando mayúscula/minúscula)
                */ 
                const filteredData = data.cuentas.filter(c => 
                    c.moneda.match(/^(?:\$|u\$s)$/) && 
                    c.n.match(/^\d{12}$/) && 
                    c.saldo.match(/^\-?\d+(\.\d+)?$/) &&
                    c.tipo_letras.match(/^(CA|CC)$/i));
                
                setAccounts(filteredData);
                /*
                Separo las cuentas de forma que si hay 6 o menos cuentas, se muestren todas en la primer página.
                En caso contrario, muestro 5 en la primera y en resto 4, ya que con los botones de paginación
                no puede haber más de 6 botones por página.
                Además, se contempla el caso borde donde en la última página debería mostrar 5 cuentas en lugar de 4
                y tener una página extra solo para 1 cuenta.
                */
                if(filteredData.length <= 6){
                    setAccountsPerPage(filteredData);
                    setPages(1);
                } else{
                    let dataToRender = [], i = 0, j = 0;
                    dataToRender[0] = filteredData.slice(j, j + 5);
                    i++;
                    j += 5;
                    while(j < filteredData.length){
                        if(filteredData.length - j === 5){
                            dataToRender[i] = filteredData.slice(j, j + 5); 
                            j += 5;
                        } else{
                            dataToRender[i] = filteredData.slice(j, j + 4);
                            j += 4;
                        }
                        i++;
                        setAccountsPerPage(dataToRender);
                        setPages(i);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, []);

    return(
        <Context.Provider value={ {accounts, accountsPerPage, pages, loading} }>
            {children}
        </Context.Provider>
    );
}

export default AccountContext;