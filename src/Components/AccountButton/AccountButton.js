import { Link } from "react-router-dom";


const AccountButton = ({type, number, currency}) => {
    return(
        <Link to={`/account/${number}/${currency}`}>
            <button className="accountButton">
                <li>
                    <ul>{type.match(/^(CA)$/i) ? "Caja de Ahorro" : "Cuenta Corriente"} en {currency === '$' ? "Pesos" : "Dólares"}</ul>
                    <ul>Nro: {number}</ul>
                </li>
            </button>
        </Link>
    )
}

export default AccountButton;