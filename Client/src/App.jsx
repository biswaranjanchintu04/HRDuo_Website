import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MarketingLayout from './layouts/MarketingLayout';
import ScrollToTop from './components/common/ScrollToTop';
import { AlertProvider } from './context/AlertContext';

// Auth Pages
import LoginSelection from './pages/auth/LoginSelection';
import Login from './pages/auth/Login';
import EmployeeLogin from './pages/auth/EmployeeLogin';
import SuperAdminLogin from './pages/auth/SuperAdminLogin';

// Public & Marketing Pages
import MarketingHome from './pages/marketing/MarketingHome';
import SolutionsPage from './pages/marketing/SolutionsPage';
import AboutPage from './pages/marketing/AboutPage';
import ServicesPage from './pages/marketing/ServicesPage';
import PricingPage from './pages/marketing/PricingPage';
import SecurityPage from './pages/marketing/SecurityPage';
import ContactPage from './pages/marketing/ContactPage';
import FaceAttendanceKiosk from './pages/public/FaceAttendanceKiosk';

function App() {
  return (
    <AlertProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Marketing & Public Informational Pages */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<MarketingHome />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<LoginSelection />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/superadmin/login" element={<SuperAdminLogin />} />

          {/* Standalone Interactive Kiosk Demo */}
          <Route path="/face-attendance" element={<FaceAttendanceKiosk />} />
          <Route path="/face-kiosk" element={<FaceAttendanceKiosk />} />
          <Route path="/admin/face-kiosk" element={<FaceAttendanceKiosk />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
