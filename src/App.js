import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const StartWindow = lazy(() => import("./pages/StartWindow"));
const MainWindow = lazy(() => import("./pages/MainWindow"));
const PaymentWindow = lazy(() => import("./pages/PaymentWindow"));
const PaymentResult = lazy(() => import("./pages/PaymentResult"));

function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<StartWindow />} />
            <Route path="/main" element={<MainWindow />} />
            <Route path="/payment" element={<PaymentWindow />} />
            <Route path="/payment-result" element={<PaymentResult />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
