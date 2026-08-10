import { Routes, Route } from "react-router-dom";

import Navbar from "./assets/components/navbar";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Menu from "./pages/menu";
import Reservation from "./pages/reservation";
import ViewReservations from "./pages/ViewReservations";
import MyReservations from "./pages/MyReservations";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./assets/components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/viewreservations" element={<ViewReservations />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/myreservations"
          element={
            <ProtectedRoute>
              <MyReservations />
            </ProtectedRoute>
          }
        />
      </Routes>
  </>
  );
}

export default App;