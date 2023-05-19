import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Container from './Components/Container/Container';
import AccountDetail from './Components/AccountDetail/AccountDetail';
import AccountContext from './Components/AccountContext/AccountContext';


function App() {
  return (
    <div className="appContainer">
      <header className="header">
        <h2>NCR</h2>
      </header>
      <AccountContext>
        <Routes>
          <Route path='/' element={<Container/>}></Route>
          <Route path='/account/:number/:curr' element={<AccountDetail/>}></Route>
        </Routes>
      </AccountContext>
    </div>
  );
}

export default App;
