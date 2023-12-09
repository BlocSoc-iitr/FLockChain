import "./App.css";
import Home from "./Pages/Home";
import Option from "./Pages/Option";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserTable from "./Components/UserTable";
import UserDashboard from "./Pages/UserDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Option" element={<Option />} />
          <Route path="/users" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
