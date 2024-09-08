import './App.css';
import { InputsProvider } from './Inputs/InputsContext';
import Dscr from './Pages/Dscr';

function App() {
  return (
    <InputsProvider >
      <h2 className="header">Acquisition Costs Calculator</h2>
      <Dscr />
    </InputsProvider>
  );
}

export default App;
