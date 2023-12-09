import "./App.css";
import Home from "./Pages/Home";
import Option from "./Pages/Option";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Option" element={<Option />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
