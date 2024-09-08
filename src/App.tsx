import React from 'react';
import './App.css';
import ProfitMarginGraph from './components/ProfitMarginGraph';
import { InputsProvider } from './Inputs/InputsContext';
import Dscr from './Pages/Dscr';

function App() {
  return (
    <InputsProvider >
      <h2 className="header">Acquisition Costs Calculator</h2>
      {/* <ProfitMarginGraph /> */}
      <Dscr />
    </InputsProvider>
  );
}

export default App;
