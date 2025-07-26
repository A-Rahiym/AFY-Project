import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from "./routes/Register";
import Login from "./routes/Login";
import PaymentStatus from "./routes/PaymentStatus";
import WelcomePage from "./routes/WelcomePage";
import ViewProfile from "./routes/Profile";
import Dashboard from "./routes/Dashboard";
import AccommodationPayment from "./routes/AccomodationPayment";
import HostelAndRoomBooking from "./routes/HostelAndRoomBooking";
import HostelChoicePage from "./routes/HostelChoicePage";
import AdminHostelAssignment from "./routes/AdminHostelAssignment";
import Layout from "./infrastructure/layout";



const App = () => (
  <Router>
    <Routes>
      {/* Routes without Navbar */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/studentLogin" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment-status" element={<PaymentStatus />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/book-room" element={<HostelAndRoomBooking />} />
        <Route path="/accommodation-payment" element={<AccommodationPayment />} />
        <Route path="/choose-hostel" element={<HostelChoicePage />} />
        <Route path="/admin-assignment" element={<AdminHostelAssignment />} />
        {/* Add more protected or navbar-layout routes here */}
      </Route>
    </Routes>
  </Router>
);
export default App;
