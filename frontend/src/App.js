import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Upload from './pages/Upload';
import AdminDashboard from './pages/AdminDashboard';
import { NotificationProvider } from './context/NotificationContext';
import NotificationToast from './components/NotificationToast';
import ThemeToggle from './components/ThemeToggle';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const user = "currentUser"; // Replace with actual user logic

  return (
    <NotificationProvider user={user}>
      <Router>
        <Navbar />
        <ThemeToggle />
        <LanguageSwitcher />
        <NotificationToast />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/profile" element={<Profile user={{ name: user }} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;