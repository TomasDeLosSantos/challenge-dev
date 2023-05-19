import React, { useState, useEffect } from "react";

export const Context = React.createContext([]);

const AccountContext = ({ defaultValue = [], children }) => {
    const [accounts, setAccounts] = useState(defaultValue);
    const [accountsPerPage, setAccountsPerPage] = useState(defaultValue);
    const [pages, setPages] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchData = await fetch('https://api.npoint.io/97d89162575a9d816661');
                const data = await fetchData.json();
                const filteredData = data.cuentas.filter(c => 
                    c.moneda.match(/^(?:\$|u\$s)$/) && 
                    c.n.match(/^\d{12}$/) && 
                    c.saldo.match(/^\-?\d+(\.\d+)?$/) &&
                    c.tipo_letras.match(/^(CA|CC)$/i));
                
                setAccounts(filteredData);
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
            } catch (error) {
                console.error(error);
            }
        }
        getData();
    }, []);

    return(
        <Context.Provider value={ {accounts, accountsPerPage, pages} }>
            {children}
        </Context.Provider>
    );
}

export default AccountContext;