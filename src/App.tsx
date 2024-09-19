import './App.css';
import { InputsProvider } from './Inputs/InputsContext';
import Dscr from './Pages/Dscr';
import DebtTable from './Pages/DebtTable';
import Irr from './Pages/Irr';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

function App() {
  return (
    <InputsProvider >
      <h2 className="header">Acquisition Costs Calculator</h2>
      <Router>
        <nav className="nav-bar">
          <NavLink to="/" className="nav-link" end>
            DSCR
          </NavLink>
          <NavLink to="/irr" className="nav-link" >
            IRR
          </NavLink>
          <NavLink to="/debt-table" className="nav-link" >
            Debt Table (wip)
          </NavLink>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Dscr />} />
            <Route path="/irr" element={<Irr />} />
            <Route path="/debt-table" element={<DebtTable />} />
          </Routes>
        </div>
      </Router>
    </InputsProvider>
  );
}

export default App;
