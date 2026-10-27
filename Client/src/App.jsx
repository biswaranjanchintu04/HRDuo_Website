import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import { AlertProvider } from './context/AlertContext';
import { HRMSProvider } from './context/HRMSContext';
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

// 1. Super Admin Portal Pages
import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import OrganizationsPage from './pages/superadmin/OrganizationsPage';
import SuperAdminPlans from './pages/superadmin/SuperAdminPlans';
import PaymentsPage from './pages/superadmin/PaymentsPage';
import PlatformAnalytics from './pages/superadmin/PlatformAnalytics';
import SupportTicketsPage from './pages/superadmin/SupportTicketsPage';
import SuperAdminNotifications from './pages/superadmin/SuperAdminNotifications';
import AuditLogsPage from './pages/superadmin/AuditLogsPage';
import SuperAdminSettings from './pages/superadmin/SuperAdminSettings';

// 2. Company Admin Portal Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeesPage from './pages/admin/EmployeesPage';
import DepartmentsPage from './pages/admin/DepartmentsPage';
import DesignationsPage from './pages/admin/DesignationsPage';
import TeamsPage from './pages/admin/TeamsPage';
import WorkLocationsPage from './pages/admin/WorkLocationsPage';
import ShiftsPage from './pages/admin/ShiftsPage';
import AdminAttendancePage from './pages/admin/AdminAttendancePage';
import AdminLeavesPage from './pages/admin/AdminLeavesPage';
import ReportsPage from './pages/admin/ReportsPage';
import CompanySubscriptionPage from './pages/admin/CompanySubscriptionPage';
import AdminSettings from './pages/admin/AdminSettings';
import NoticesPage from './pages/admin/NoticesPage';
import PayrollPage from './pages/admin/PayrollPage';

// 3. HR Portal Pages
import HRDashboard from './pages/hr/HRDashboard';
import HRAddEmployee from './pages/hr/HRAddEmployee';
import HREmployeeDetails from './pages/hr/HREmployeeDetails';
import HROnboarding from './pages/hr/HROnboarding';
import HRPerformance from './pages/hr/HRPerformance';
import HRDocuments from './pages/hr/HRDocuments';
import HRSettingsPage from './pages/hr/HRSettingsPage';
import HRRecruitment from './pages/hr/HRRecruitment';

// 4. Manager Portal Pages
import ManagerDashboard from './pages/manager/ManagerDashboard';
import TeamPage from './pages/manager/TeamPage';
import ManagerAttendancePage from './pages/manager/ManagerAttendancePage';
import ManagerLeavesPage from './pages/manager/ManagerLeavesPage';
import ManagerCorrectionsPage from './pages/manager/ManagerCorrectionsPage';
import ManagerPerformancePage from './pages/manager/ManagerPerformancePage';
import ManagerReportsPage from './pages/manager/ManagerReportsPage';
import ManagerNotificationsPage from './pages/manager/ManagerNotificationsPage';
import ManagerSettings from './pages/manager/ManagerSettings';
import TasksPage from './pages/manager/TasksPage';
import ManagerMessages from './pages/manager/ManagerMessages';

// 5. Employee Portal Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import EmployeeLeaves from './pages/employee/EmployeeLeaves';
import EmployeeLeaveBalance from './pages/employee/EmployeeLeaveBalance';
import EmployeeProfile from './pages/employee/EmployeeProfile';
import EmployeeSalary from './pages/employee/EmployeeSalary';
import EmployeeDocuments from './pages/employee/EmployeeDocuments';
import EmployeeAnnouncements from './pages/employee/EmployeeAnnouncements';
import EmployeeHolidays from './pages/employee/EmployeeHolidays';
import EmployeeSupport from './pages/employee/EmployeeSupport';
import EmployeeSettings from './pages/employee/EmployeeSettings';

function App() {
  return (
    <AlertProvider>
      <HRMSProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/login/selection" element={<LoginSelection />} />
              <Route path="/admin/login" element={<Login role="ADMIN" roleTitle="Company Admin Console" />} />
              <Route path="/hr/login" element={<Login role="HR" roleTitle="HR Management Portal" />} />
              <Route path="/manager/login" element={<Login role="MANAGER" roleTitle="Team Manager Portal" />} />
              <Route path="/employee/login" element={<Login role="EMPLOYEE" roleTitle="Employee Self-Service" />} />
              <Route path="/superadmin/login" element={<Login role="SUPER_ADMIN" roleTitle="Super Admin Console" />} />

              {/* Standalone Interactive Kiosk Demo */}
              <Route path="/face-attendance" element={<FaceAttendanceKiosk />} />
              <Route path="/face-kiosk" element={<FaceAttendanceKiosk />} />
              <Route path="/admin/face-kiosk" element={<FaceAttendanceKiosk />} />
              <Route path="/admin/face-registration" element={<FaceAttendanceKiosk />} />

              {/* ========================================================= */}
              {/* 1. Super Admin Portal                                     */}
              {/* ========================================================= */}
              <Route path="/superadmin" element={<SuperAdminLayout />}>
                <Route index element={<Navigate to="/superadmin/dashboard" replace />} />
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="companies" element={<OrganizationsPage />} />
                <Route path="organizations" element={<OrganizationsPage />} />
                <Route path="plans" element={<SuperAdminPlans />} />
                <Route path="subscriptions" element={<SuperAdminPlans />} />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="billing" element={<PaymentsPage />} />
                <Route path="analytics" element={<PlatformAnalytics />} />
                <Route path="tickets" element={<SupportTicketsPage />} />
                <Route path="notifications" element={<SuperAdminNotifications />} />
                <Route path="audit-logs" element={<AuditLogsPage />} />
                <Route path="settings" element={<SuperAdminSettings />} />
              </Route>

              {/* ========================================================= */}
              {/* 2. Company Admin Portal                                   */}
              {/* ========================================================= */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="employees" element={<EmployeesPage />} />
                <Route path="departments" element={<DepartmentsPage />} />
                <Route path="designations" element={<DesignationsPage />} />
                <Route path="teams" element={<TeamsPage />} />
                <Route path="locations" element={<WorkLocationsPage />} />
                <Route path="shifts" element={<ShiftsPage />} />
                <Route path="attendance" element={<AdminAttendancePage />} />
                <Route path="leaves" element={<AdminLeavesPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="subscription" element={<CompanySubscriptionPage />} />
                <Route path="settings" element={<AdminSettings />} />
                {/* Ancillary existing paths */}
                <Route path="payroll" element={<PayrollPage />} />
                <Route path="notices" element={<NoticesPage />} />
                <Route path="face-registration" element={<FaceAttendanceKiosk />} />
              </Route>

              {/* ========================================================= */}
              {/* 3. Dedicated HR Portal                                    */}
              {/* ========================================================= */}
              <Route path="/hr" element={<HRLayout />}>
                <Route index element={<Navigate to="/hr/dashboard" replace />} />
                <Route path="dashboard" element={<HRDashboard />} />
                <Route path="employees" element={<EmployeesPage />} />
                <Route path="add-employee" element={<HRAddEmployee />} />
                <Route path="employee-details" element={<HREmployeeDetails />} />
                <Route path="onboarding" element={<HROnboarding />} />
                <Route path="attendance" element={<AdminAttendancePage />} />
                <Route path="leaves" element={<AdminLeavesPage />} />
                <Route path="payroll" element={<PayrollPage />} />
                <Route path="recruitment" element={<HRRecruitment />} />
                <Route path="performance" element={<HRPerformance />} />
                <Route path="documents" element={<HRDocuments />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="settings" element={<HRSettingsPage />} />
                <Route path="notices" element={<NoticesPage />} />
              </Route>

              {/* ========================================================= */}
              {/* 4. Manager Portal                                         */}
              {/* ========================================================= */}
              <Route path="/manager" element={<ManagerLayout />}>
                <Route index element={<Navigate to="/manager/dashboard" replace />} />
                <Route path="dashboard" element={<ManagerDashboard />} />
                <Route path="team" element={<TeamPage />} />
                <Route path="attendance" element={<ManagerAttendancePage />} />
                <Route path="leaves" element={<ManagerLeavesPage />} />
                <Route path="corrections" element={<ManagerCorrectionsPage />} />
                <Route path="performance" element={<ManagerPerformancePage />} />
                <Route path="reports" element={<ManagerReportsPage />} />
                <Route path="notifications" element={<ManagerNotificationsPage />} />
                <Route path="settings" element={<ManagerSettings />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="messages" element={<ManagerMessages />} />
              </Route>

              {/* ========================================================= */}
              {/* 5. Employee Portal                                        */}
              {/* ========================================================= */}
              <Route path="/employee" element={<EmployeeLayout />}>
                <Route index element={<Navigate to="/employee/dashboard" replace />} />
                <Route path="dashboard" element={<EmployeeDashboard />} />
                <Route path="attendance" element={<EmployeeAttendance />} />
                <Route path="leaves" element={<EmployeeLeaves />} />
                <Route path="leave-balance" element={<EmployeeLeaveBalance />} />
                <Route path="profile" element={<EmployeeProfile />} />
                <Route path="salary" element={<EmployeeSalary />} />
                <Route path="payslips" element={<EmployeeSalary />} />
                <Route path="documents" element={<EmployeeDocuments />} />
                <Route path="announcements" element={<EmployeeAnnouncements />} />
                <Route path="holidays" element={<EmployeeHolidays />} />
                <Route path="support" element={<EmployeeSupport />} />
                <Route path="settings" element={<EmployeeSettings />} />
              </Route>

              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </EmployeeProvider>
      </HRMSProvider>
    </AlertProvider>
  );
}

export default App;
