import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import LandingPage from "./components/LandingPage.tsx";
import Ledger from "./components/Ledger.tsx";
import SignUp from "./components/SignUp.tsx";
import LogIn from "./components/LogIn.tsx";
import Navbar from "./components/Navbar.tsx";
import { Provider } from "./components/ui/provider.tsx";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <div className="overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ledger" element={<Ledger />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
