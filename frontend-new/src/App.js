import "./App.css";
import Home from "./Pages/Home";
import Option from "./Pages/Option";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from "./Pages/UserDashboard";
import Client from "./Pages/Client";
import NodeMap from "./Components/NodeMap";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/option" element={<Option />} />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/session-details" element={<NodeMap />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
