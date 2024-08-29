import React from 'react';
import './App.css';
import ProfitMarginGraph from './components/ProfitMarginGraph';
import Inputs from './Inputs/Inputs';
import { InputsProvider } from './Inputs/InputsContext';

function App() {
  return (
    <InputsProvider>
      <h2>Acquisition Costs Calculator</h2>
      <Inputs />
      <ProfitMarginGraph />
    </InputsProvider>
  );
}

export default App;
