import Registration from "./components/Registration";
// import Particle from "./components/Particle";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Report from "./components/Report";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter><Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
