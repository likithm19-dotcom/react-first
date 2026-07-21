import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './assets/components/navbar';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Menu from './pages/menu';
import Gallery from './pages/gallery';
import Reservation from './pages/reservation';

function App() {
  return(
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/reservations" element={<Reservation />} />
    </Routes>
  </BrowserRouter>
    </>
  );
}
export default App;