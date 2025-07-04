import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AnimatedBackground from './components/AnimatedBackground';
import ParticleField from './components/ParticleField';
import FloatingElements from './components/FloatingElements';
import GlowingGrid from './components/GlowingGrid';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Layered animated backgrounds */}
      <GlowingGrid />
      <ParticleField />
      <AnimatedBackground />
      <FloatingElements />
      
      {/* Main app content */}
      <div className="relative z-20">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
      
      {/* Overlay gradient for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/20 pointer-events-none z-10" />
    </div>
  );
}