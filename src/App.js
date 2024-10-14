import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainWindow from './MainWindow.js';
import StartWindow from './StartWindow.js';
import PaymentWindow from './PaymentWindow.js';
import PaymentResult from './PaymentResult.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<StartWindow />} />
          <Route path="/main" element={<MainWindow />} />
          <Route path="/payment" element={<PaymentWindow />} />
          <Route path="/payment-result" element={<PaymentResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
