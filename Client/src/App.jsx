import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import { AlertProvider } from './context/AlertContext';
import { EmployeeProvider } from './context/EmployeeContext';

// Layouts
import MarketingLayout from './layouts/MarketingLayout';
import AdminLayout from './layouts/AdminLayout';
import HRLayout from './layouts/HRLayout';
import ManagerLayout from './layouts/ManagerLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';

// Auth Pages
import LoginSelection from './pages/auth/LoginSelection';
import Login from './pages/auth/Login';
import HRLogin from './pages/auth/HRLogin';
import ManagerLogin from './pages/auth/ManagerLogin';
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

// Super Admin Portal Pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import OrganizationsPage from './pages/superadmin/OrganizationsPage';
import PaymentsPage from './pages/superadmin/PaymentsPage';
import SuperAdminSettings from './pages/superadmin/SuperAdminSettings';

// Company Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeesPage from './pages/admin/EmployeesPage';
import AdminAttendancePage from './pages/admin/AdminAttendancePage';
import PayrollPage from './pages/admin/PayrollPage';
import AdminLeavesPage from './pages/admin/AdminLeavesPage';
import NoticesPage from './pages/admin/NoticesPage';
import ReportsPage from './pages/admin/ReportsPage';
import AdminSettings from './pages/admin/AdminSettings';

// HR Portal Pages
import HRDashboard from './pages/hr/HRDashboard';
import HRRecruitment from './pages/hr/HRRecruitment';

// Manager Portal Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';
import TeamPage from './pages/manager/TeamPage';
import ManagerAttendancePage from './pages/manager/ManagerAttendancePage';
import ManagerLeavesPage from './pages/manager/ManagerLeavesPage';
import TasksPage from './pages/manager/TasksPage';
import ManagerReportsPage from './pages/manager/ManagerReportsPage';
import ManagerMessages from './pages/manager/ManagerMessages';
import ManagerSettings from './pages/manager/ManagerSettings';

// Employee Portal Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import EmployeeLeaves from './pages/employee/EmployeeLeaves';
import EmployeeSalary from './pages/employee/EmployeeSalary';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import EmployeeSettings from './pages/employee/EmployeeSettings';

function App() {
  return (
    <AlertProvider>
      <EmployeeProvider>
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
            <Route path="/hr/login" element={<HRLogin />} />
            <Route path="/manager/login" element={<ManagerLogin />} />
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route path="/superadmin/login" element={<SuperAdminLogin />} />

            {/* Standalone Interactive Kiosk Demo */}
            <Route path="/face-attendance" element={<FaceAttendanceKiosk />} />
            <Route path="/face-kiosk" element={<FaceAttendanceKiosk />} />
            <Route path="/admin/face-kiosk" element={<FaceAttendanceKiosk />} />
            <Route path="/admin/face-registration" element={<FaceAttendanceKiosk />} />

            {/* 1. Super Admin Portal */}
            <Route path="/superadmin" element={<SuperAdminLayout />}>
              <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
              <Route path="dashboard" element={<SuperAdminDashboard />} />
              <Route path="organizations" element={<OrganizationsPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="settings" element={<SuperAdminSettings />} />
            </Route>

            {/* 2. Company Admin Portal */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="attendance" element={<AdminAttendancePage />} />
              <Route path="face-registration" element={<FaceAttendanceKiosk />} />
              <Route path="payroll" element={<PayrollPage />} />
              <Route path="leaves" element={<AdminLeavesPage />} />
              <Route path="notices" element={<NoticesPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 3. Dedicated HR Portal */}
            <Route path="/hr" element={<HRLayout />}>
              <Route index element={<Navigate to="/hr/dashboard" replace />} />
              <Route path="dashboard" element={<HRDashboard />} />
              <Route path="employees" element={<EmployeesPage />} />
              <Route path="attendance" element={<AdminAttendancePage />} />
              <Route path="leaves" element={<AdminLeavesPage />} />
              <Route path="payroll" element={<PayrollPage />} />
              <Route path="recruitment" element={<HRRecruitment />} />
              <Route path="notices" element={<NoticesPage />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 4. Manager Portal */}
            <Route path="/manager" element={<ManagerLayout />}>
              <Route index element={<Navigate to="/manager/dashboard" replace />} />
              <Route path="dashboard" element={<ManagerDashboard />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="attendance" element={<ManagerAttendancePage />} />
              <Route path="leaves" element={<ManagerLeavesPage />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="reports" element={<ManagerReportsPage />} />
              <Route path="messages" element={<ManagerMessages />} />
              <Route path="settings" element={<ManagerSettings />} />
            </Route>

            {/* 5. Employee Portal */}
            <Route path="/employee" element={<EmployeeLayout />}>
              <Route index element={<Navigate to="/employee/dashboard" replace />} />
              <Route path="dashboard" element={<EmployeeDashboard />} />
              <Route path="attendance" element={<EmployeeAttendance />} />
              <Route path="leaves" element={<EmployeeLeaves />} />
              <Route path="salary" element={<EmployeeSalary />} />
              <Route path="profile" element={<EmployeeProfile />} />
              <Route path="settings" element={<EmployeeSettings />} />
            </Route>

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </EmployeeProvider>
    </AlertProvider>
  );
}

export default App;
