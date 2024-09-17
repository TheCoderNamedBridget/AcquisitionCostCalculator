import './App.css';
import { InputsProvider } from './Inputs/InputsContext';
import Dscr from './Pages/Dscr';
import DebtTable from './Pages/DebtTable';
import Irr from './Pages/Irr';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProfitMarginGraph from './Pages/ProfitMarginGraph';

function App() {
  return (
    <InputsProvider >
      <h2 className="header">Acquisition Costs Calculator</h2>
      <Router>
        <nav>
          <ul>
            <li><Link to="/">DSCR</Link></li>
            <li><Link to="/irr">IRR</Link></li>
            <li><Link to="/debt-table">Debt Table (wip)</Link></li>
            <li><Link to="/profit-margin-graph">Profit Margin (wip)</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Dscr />} />
          <Route path="/irr" element={<Irr />} />
          <Route path="/debt-table" element={<DebtTable />} />
          <Route path="/profit-margin-graph" element={<ProfitMarginGraph />} />
        </Routes>
      </Router>
    </InputsProvider>
  );
}

export default App;
