import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalLayout from './components/layout/GlobalLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Numerology from './pages/Numerology';
import Tarot from './pages/Tarot';
import Booking from './pages/Booking';
import AdminRoute from './components/routing/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import AdminFeedbacks from './pages/admin/AdminFeedbacks';
import AdminBookings from './pages/admin/AdminBookings';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import FeedbackModal from './components/ui/FeedbackModal';

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
          <Route path="/booking" element={<Booking />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/feedbacks" element={<AdminFeedbacks />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
          </Route>
        </Route>
      </Routes>
      <FeedbackModal />
    </Router>
  );
}

export default App;
