import React from 'react';
import './App.css';
import ProfitMarginGraph from './components/ProfitMarginGraph';
import Inputs from './Inputs/Inputs';
import { InputsProvider } from './Inputs/InputsContext';
import Dscr from './Pages/Dscr';
import DraggablePieChart from './draggable-pie-chart/DraggablePieChart';

function App() {
  const canvas = document.createElement('canvas');

  canvas.width = 600;
  canvas.height = 400;
  document.body.appendChild(canvas);
  const piechart = new DraggablePieChart({
    canvas: canvas,
  });

  piechart.draw();
  return (
    <InputsProvider >
      <h2>Acquisition Costs Calculator</h2>
      {/* <Inputs /> */}
      {/* <ProfitMarginGraph /> */}
      <Dscr />
    </InputsProvider>
  );
}

export default App;
