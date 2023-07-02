import Registration from "./components/Registration";
import Particle from "./components/Particle";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Particle />
      <BrowserRouter><Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes></BrowserRouter>
    </div>
  );
}

export default App;
