import './App.css';
import { InputsProvider } from './Inputs/InputsContext';
import Dscr from './Pages/Dscr';
import DebtTable from './components/DebtTable';
import Irr from './components/Irr';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <InputsProvider >
      <h2 className="header">Acquisition Costs Calculator</h2>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">DSCR</Link></li>
            <li><Link to="/irr">IRR</Link></li>
            <li><Link to="/debt-table">Debt Table</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dscr />} />
          <Route path="/irr" element={<Irr cashFlows={[]} initialGuess={0} tolerance={0} maxIterations={0} />} />
          <Route path="/debt-table" element={<DebtTable />} />
        </Routes>
      </Router>
    </InputsProvider>
  );
}

export default App;
