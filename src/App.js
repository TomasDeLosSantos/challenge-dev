import { Routes, Route, Navigate } from 'react-router-dom';
import Container from './Components/Container';
import AccountDetail from './Components/AccountDetail';
import AccountContext from './Components/AccountContext';

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
          <Route path='/*' element={ <Navigate to={'/'}></Navigate> }></Route>
        </Routes>
      </AccountContext>
    </div>
  );
}

export default App;
