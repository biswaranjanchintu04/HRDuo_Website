# HRDuo — Multi-Portal HRMS SaaS Platform

A modern, enterprise-grade, frontend-only Human Resource Management System (HRMS) SaaS platform featuring **five distinct, role-tailored portals**. Built with **React 19**, **Vite**, **Tailwind CSS**, **Recharts**, **Lucide Icons**, and **Framer Motion**.

---

## 🚀 Key Highlights & Architecture

- **100% Frontend-Only**: Operates autonomously without requiring external databases, Spring Boot, or backend APIs.
- **Reactive State & Persistence**: Backed by `HRMSContext` and `localStorage`, enabling full CRUD operations, live status changes, and instant data persistence across page reloads.
- **5 Dedicated Portals**:
  1. **Super Admin**: Platform oversight, multi-tenant company management, subscription tiers, platform revenue, support ticketing, notifications, and system audit logs.
  2. **Company Admin**: Company-level workforce configuration, department structures, designations, teams, work locations, shift hours, attendance overviews, leave governance, and billing.
  3. **HR**: End-to-end employee lifecycle, onboarding pipelines, document repositories, attendance registers, leave processing, payroll summaries, and talent acquisition.
  4. **Manager**: Team-level attendance monitoring, leave approvals, attendance time corrections, OKR & performance tracking, and direct report analytics.
  5. **Employee**: Self-service hub with one-click live check-in/check-out simulation, leave applications, remaining balance tracking, payslip downloads, documents, holidays, and announcements.
- **Design System**: Tailored around high-contrast dark navy navigation (`#0B132B` / `bg-slate-900`), crisp slate surfaces (`#F8FAFC`), vibrant sapphire action states (`#2563EB`), and polished typography.
- **Instant Role Switcher**: Quick-switch between all 5 roles seamlessly via the top navbar or the login screen.

---

## 🔑 Demo Access & Predefined Roles

The login page at `/login` provides 1-click demo login buttons for all five roles. All authentication is simulated locally for demonstration purposes:

| Portal | Role | Predefined Email | Password |
|---|---|---|---|
| **Super Admin** | Super Admin | `superadmin@hrduo.com` | `admin123` |
| **Company Admin** | Company Admin | `admin@acmecorp.com` | `admin123` |
| **HR** | HR Specialist | `hr@acmecorp.com` | `admin123` |
| **Manager** | Engineering Manager | `manager@acmecorp.com` | `admin123` |
| **Employee** | Software Engineer | `employee@acmecorp.com` | `admin123` |

*Note: You can also switch between any portal instantly at any time from the top navigation bar's portal dropdown.*

---

## 🌟 Portals & Pages Overview

### 1. Super Admin Portal (`/superadmin/*`)
- **Dashboard**: Platform KPIs (Total Companies, Active Companies, Total Employees, Active Subscriptions, MRR, Pending Payments), company growth charts, plan distribution pie chart, and revenue analytics.
- **Company Management**: Tenant directory with search, filter, status toggling, and new company registration modal.
- **Subscription Plans**: Plan tiers (Starter, Professional, Enterprise) with pricing and feature lists.
- **Billing & Payments**: Invoices and transaction history with statuses.
- **Platform Analytics**: User engagement metrics and traffic visualization.
- **Support Tickets**: Multi-tenant support ticket queue with status and priority updates.
- **Notifications**: Broadcast system announcements and activity feed.
- **Audit Logs**: Filterable system security and administrative activity log.
- **Settings**: Global platform configurations and maintenance controls.

### 2. Company Admin Portal (`/admin/*`)
- **Dashboard**: Company metrics (Total Employees, Present Today, Absent, On Leave, Pending Approvals, Departments), 7-day attendance trends, and recent staff activity.
- **Employee Management**: Full CRUD employee directory with search, department filtering, profile view modal, add employee modal, and edit modal.
- **Departments**: Department list with head of department, employee count, and status badges.
- **Designations**: Job title catalog with salary bands and levels.
- **Teams**: Cross-functional team organization and lead assignments.
- **Work Locations**: Office campuses, branches, and remote policies.
- **Shifts & Work Hours**: Shift schedule management with grace periods.
- **Attendance Overview**: Company-wide daily log with status filters.
- **Leave Management**: Leave requests with 1-click Approve/Reject actions.
- **Reports**: Headcount, attendance, and turnover report exports.
- **Subscription Details**: Active company plan details, renewal dates, and license usage.
- **Company Settings**: Organization profile, timezone, and fiscal calendar.

### 3. HR Portal (`/hr/*`)
- **Dashboard**: HR operations overview, pending leaves queue, employee quick list, and upcoming team birthdays.
- **Employee Directory**: Comprehensive directory with quick actions.
- **Add Employee**: Multi-step onboarding form with validation and instant directory update.
- **Employee Details**: In-depth profile with tabs for personal, job, compensation, and documents.
- **Onboarding**: New hire pipeline tracking (Documentation, Provisioning, Orientation).
- **Attendance Management**: Daily attendance tracking with manual override simulation.
- **Leave Requests**: Leave approval workflows with status notifications.
- **Payroll Overview**: Salary disbursements, allowances, deductions, and pay cycle status.
- **Recruitment**: Open job requisitions, candidate pipeline, and stage management.
- **Performance Reviews**: Appraisal cycles, reviewer assignments, and rating distributions.
- **Employee Documents**: Company document vault and policy uploads.
- **HR Settings**: Leave policy configuration, working days, and probation rules.

### 4. Manager Portal (`/manager/*`)
- **Dashboard**: Direct team cards (Team Members, Present, Absent, On Leave, Pending Approvals), sprint velocity chart, and pending leave queue.
- **My Team**: Direct reports roster with contact info, current status, and performance ratings.
- **Team Attendance**: Team-specific daily presence, check-in timestamps, and shift details.
- **Leave Approvals**: Direct approval/rejection interface for team leave requests.
- **Attendance Corrections**: Review employee punch adjustment requests with one-click decision tools.
- **Performance & Goals**: OKR tracker, sprint milestones, and team progress metrics.
- **Team Reports**: Team attendance and productivity reporting.
- **Notifications**: Alerts on approvals, punch corrections, and milestone dates.
- **Profile & Settings**: Manager preferences and notification channels.

### 5. Employee Portal (`/employee/*`)
- **Dashboard**: Personal status cards (Today's Attendance, Check-in Time, Check-out Time, Hours Worked, Leave Balance), live one-click Check-In / Check-Out toggle, upcoming company holidays, and notices.
- **My Attendance**: Personal punch history, work duration, and punctuality badges.
- **Check In / Check Out**: Interactive terminal with simulated location and timestamp capture.
- **Leave Requests**: Interactive leave application modal with date pickers and reason inputs.
- **Leave Balance**: Breakdown across Casual, Sick, Annual, and Unpaid leave quotas.
- **My Profile**: Editable contact info, emergency contacts, and personal information.
- **Payslips**: Monthly salary statement preview with simulated PDF download.
- **My Documents**: Employment contracts, tax documents, and ID verifications.
- **Company Announcements**: Bulletin board for company-wide news.
- **Holidays**: Annual company holiday calendar with countdowns.
- **HR Support**: Direct ticket submission to HR desk.
- **Settings**: Password changes, notification preferences, and display options.

---

## 🛠️ Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run

1. Navigate to the `Client` directory:
   ```bash
   cd Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

5. Production Build check:
   ```bash
   npm run build
   ```

---

## 🚂 Railway Deployment Guide

This project is fully prepared for zero-configuration static or Node-based deployment on **[Railway](https://railway.app/)**.

### Deployment Settings in Railway:

1. **Root Directory**: `Client` (or deploy from the repository root pointing to `Client`)
2. **Build Command**:
   ```bash
   npm run build
   ```
3. **Start Command**:
   ```bash
   npm start
   ```
4. **Environment Variables**:
   - `PORT`: (Automatically assigned by Railway, defaults to `3000`)
   - `NODE_ENV`: `production`

### Why `npm start` works seamlessly on Railway:
The repository includes a production-ready, zero-dependency Node.js server ([server.js](file:///c:/Users/hp/Desktop/HRDuo_website/Client/server.js)):
- Listens on `0.0.0.0:${PORT}` as expected by Railway.
- Serves optimized static assets from `dist/` with immutable caching.
- Provides a clean SPA fallback (`index.html`) so refreshing deep routes (like `/hr/employees` or `/manager/approvals`) never produces `404 Not Found` errors.
