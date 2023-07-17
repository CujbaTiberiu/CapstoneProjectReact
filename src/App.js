import Registration from "./components/Registration";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Report from "./components/Report";
import AdminPage from "./components/AdminPage";
import AllReports from "./components/AllReports";

function App() {
  return (
    <div className="App">
      <BrowserRouter><Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/reports" element={<AllReports />} />
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
