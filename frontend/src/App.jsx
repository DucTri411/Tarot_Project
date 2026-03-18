import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Numerology from './pages/Numerology';
import Tarot from './pages/Tarot';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/numerology" element={<Numerology />} />
          <Route path="/tarot" element={<Tarot />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
