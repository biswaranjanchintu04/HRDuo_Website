import React, { createContext, useContext, useState, useEffect } from 'react';

const HRMSContext = createContext();

// Default realistic dataset
const DEFAULT_EMPLOYEES = [
  {
    id: 'EMP001',
    empId: 'EMP001',
    name: 'Sophia Chen',
    email: 'sophia.chen@hrduo.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    role: 'Senior Full Stack Engineer',
    userRole: 'EMPLOYEE',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2023-03-15',
    salary: '$125,000',
    manager: 'Marcus Sterling',
    location: 'San Francisco HQ',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    leaveBalance: { casual: 7, sick: 9, annual: 12, total: 28 },
    performanceRating: 4.8,
  },
  {
    id: 'EMP002',
    empId: 'EMP002',
    name: 'Marcus Sterling',
    email: 'marcus.sterling@hrduo.com',
    phone: '+1 (555) 345-6789',
    department: 'Engineering',
    role: 'Engineering Lead',
    userRole: 'MANAGER',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2022-01-10',
    salary: '$155,000',
    manager: 'Elena Rostova',
    location: 'San Francisco HQ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    leaveBalance: { casual: 5, sick: 10, annual: 14, total: 29 },
    performanceRating: 4.9,
  },
  {
    id: 'EMP003',
    empId: 'EMP003',
    name: 'Claire Bennett',
    email: 'claire.bennett@hrduo.com',
    phone: '+1 (555) 456-7890',
    department: 'People & HR',
    role: 'Head of People Operations',
    userRole: 'HR',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2021-08-01',
    salary: '$140,000',
    manager: 'Elena Rostova',
    location: 'San Francisco HQ',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    leaveBalance: { casual: 8, sick: 12, annual: 15, total: 35 },
    performanceRating: 4.95,
  },
  {
    id: 'EMP004',
    empId: 'EMP004',
    name: 'Elena Rostova',
    email: 'elena.rostova@hrduo.com',
    phone: '+1 (555) 567-8901',
    department: 'Executive',
    role: 'VP of Operations & Admin',
    userRole: 'ADMIN',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2020-04-12',
    salary: '$180,000',
    manager: 'Board of Directors',
    location: 'San Francisco HQ',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    leaveBalance: { casual: 10, sick: 12, annual: 20, total: 42 },
    performanceRating: 5.0,
  },
  {
    id: 'EMP005',
    empId: 'EMP005',
    name: 'Alexander Vance',
    email: 'alexander.vance@hrduo.internal',
    phone: '+1 (555) 678-9012',
    department: 'Platform Operations',
    role: 'Super Platform Director',
    userRole: 'SUPER_ADMIN',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2019-11-01',
    salary: '$210,000',
    manager: 'Board',
    location: 'Global Platform Root',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    leaveBalance: { casual: 12, sick: 14, annual: 24, total: 50 },
    performanceRating: 5.0,
  },
  {
    id: 'EMP006',
    empId: 'EMP006',
    name: 'Liam Gallagher',
    email: 'liam.g@hrduo.com',
    phone: '+1 (555) 789-0123',
    department: 'Engineering',
    role: 'Frontend UI/UX Specialist',
    userRole: 'EMPLOYEE',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2023-09-01',
    salary: '$110,000',
    manager: 'Marcus Sterling',
    location: 'Austin Tech Center',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    leaveBalance: { casual: 6, sick: 8, annual: 10, total: 24 },
    performanceRating: 4.7,
  },
  {
    id: 'EMP007',
    empId: 'EMP007',
    name: 'Aisha Patel',
    email: 'aisha.patel@hrduo.com',
    phone: '+1 (555) 890-1234',
    department: 'Product & Design',
    role: 'Lead Product Designer',
    userRole: 'EMPLOYEE',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2022-06-15',
    salary: '$130,000',
    manager: 'Elena Rostova',
    location: 'London Hub',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150',
    leaveBalance: { casual: 8, sick: 7, annual: 11, total: 26 },
    performanceRating: 4.85,
  },
  {
    id: 'EMP008',
    empId: 'EMP008',
    name: 'David Kim',
    email: 'david.kim@hrduo.com',
    phone: '+1 (555) 901-2345',
    department: 'Marketing',
    role: 'Growth Marketing Director',
    userRole: 'EMPLOYEE',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2023-01-20',
    salary: '$118,000',
    manager: 'Elena Rostova',
    location: 'San Francisco HQ',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    leaveBalance: { casual: 5, sick: 6, annual: 9, total: 20 },
    performanceRating: 4.6,
  },
  {
    id: 'EMP009',
    empId: 'EMP009',
    name: 'Rachel Green',
    email: 'rachel.green@hrduo.com',
    phone: '+1 (555) 012-3456',
    department: 'Sales & BD',
    role: 'Enterprise Account Executive',
    userRole: 'EMPLOYEE',
    status: 'On Leave',
    employmentType: 'Full-time',
    joiningDate: '2022-11-05',
    salary: '$115,000',
    manager: 'Elena Rostova',
    location: 'Remote Worldwide',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    leaveBalance: { casual: 4, sick: 5, annual: 8, total: 17 },
    performanceRating: 4.75,
  },
  {
    id: 'EMP010',
    empId: 'EMP010',
    name: 'Noah Campbell',
    email: 'noah.campbell@hrduo.com',
    phone: '+1 (555) 123-7890',
    department: 'Engineering',
    role: 'DevOps & Cloud Architect',
    userRole: 'EMPLOYEE',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2024-02-01',
    salary: '$138,000',
    manager: 'Marcus Sterling',
    location: 'San Francisco HQ',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    leaveBalance: { casual: 9, sick: 10, annual: 15, total: 34 },
    performanceRating: 4.9,
  },
  {
    id: 'EMP011',
    empId: 'EMP011',
    name: 'Zoe Martinez',
    email: 'zoe.martinez@hrduo.com',
    phone: '+1 (555) 234-8901',
    department: 'People & HR',
    role: 'Talent Acquisition Partner',
    userRole: 'HR',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2023-10-15',
    salary: '$95,000',
    manager: 'Claire Bennett',
    location: 'Austin Tech Center',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    leaveBalance: { casual: 7, sick: 9, annual: 12, total: 28 },
    performanceRating: 4.65,
  },
  {
    id: 'EMP012',
    empId: 'EMP012',
    name: 'Ethan Ross',
    email: 'ethan.ross@hrduo.com',
    phone: '+1 (555) 345-9012',
    department: 'Finance & Legal',
    role: 'Senior Financial Analyst',
    userRole: 'EMPLOYEE',
    status: 'Active',
    employmentType: 'Full-time',
    joiningDate: '2023-04-10',
    salary: '$105,000',
    manager: 'Elena Rostova',
    location: 'London Hub',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    leaveBalance: { casual: 6, sick: 8, annual: 10, total: 24 },
    performanceRating: 4.7,
  }
];

const DEFAULT_COMPANIES = [
  {
    id: 'COMP-01',
    name: 'Acme Technologies Inc.',
    slug: 'acme-tech',
    industry: 'SaaS & Enterprise Cloud',
    plan: 'Enterprise',
    status: 'Active',
    employees: 480,
    maxEmployees: 500,
    mrr: '$2,499',
    billingCycle: 'Monthly',
    renewalDate: '2026-12-31',
    contactPerson: 'Sarah Connor',
    email: 'admin@acmetech.io',
    phone: '+1 800 555 0199',
    country: 'United States',
    joinedDate: '2023-01-15'
  },
  {
    id: 'COMP-02',
    name: 'Nexus BioHealth Labs',
    slug: 'nexus-health',
    industry: 'Healthcare & Pharma',
    plan: 'Enterprise',
    status: 'Active',
    employees: 750,
    maxEmployees: 1000,
    mrr: '$3,800',
    billingCycle: 'Annual',
    renewalDate: '2027-02-14',
    contactPerson: 'Dr. Gregory House',
    email: 'ops@nexusbio.com',
    phone: '+1 888 444 0211',
    country: 'United States',
    joinedDate: '2023-03-20'
  },
  {
    id: 'COMP-03',
    name: 'Apex Global Logistics',
    slug: 'apex-logistics',
    industry: 'Supply Chain & Freight',
    plan: 'Professional',
    status: 'Active',
    employees: 195,
    maxEmployees: 250,
    mrr: '$999',
    billingCycle: 'Monthly',
    renewalDate: '2026-11-30',
    contactPerson: 'Michael Vance',
    email: 'contact@apexglobal.com',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    joinedDate: '2023-07-10'
  },
  {
    id: 'COMP-04',
    name: 'FinVantage Wealth Partners',
    slug: 'finvantage',
    industry: 'FinTech & Banking',
    plan: 'Enterprise',
    status: 'Active',
    employees: 320,
    maxEmployees: 400,
    mrr: '$1,850',
    billingCycle: 'Annual',
    renewalDate: '2027-04-01',
    contactPerson: 'Jonathan Miller',
    email: 'it@finvantage.com',
    phone: '+1 212 555 0184',
    country: 'United States',
    joinedDate: '2023-09-05'
  },
  {
    id: 'COMP-05',
    name: 'HyperScale AI Labs',
    slug: 'hyperscale-ai',
    industry: 'Artificial Intelligence',
    plan: 'Professional',
    status: 'Trial',
    employees: 64,
    maxEmployees: 100,
    mrr: '$0 (Trial)',
    billingCycle: 'Trial',
    renewalDate: '2026-11-15',
    contactPerson: 'Dr. Samantha Wu',
    email: 'founder@hyperscale.ai',
    phone: '+1 415 555 0142',
    country: 'United States',
    joinedDate: '2026-10-15'
  },
  {
    id: 'COMP-06',
    name: 'Veritas Media Group',
    slug: 'veritas-media',
    industry: 'Digital Media & Agency',
    plan: 'Starter',
    status: 'Active',
    employees: 35,
    maxEmployees: 50,
    mrr: '$299',
    billingCycle: 'Monthly',
    renewalDate: '2026-11-20',
    contactPerson: 'Chloe Davies',
    email: 'hr@veritasmedia.com',
    phone: '+61 2 9374 4000',
    country: 'Australia',
    joinedDate: '2024-02-18'
  },
  {
    id: 'COMP-07',
    name: 'Solaria Clean Energy',
    slug: 'solaria-energy',
    industry: 'Renewables & Green Tech',
    plan: 'Professional',
    status: 'Active',
    employees: 140,
    maxEmployees: 200,
    mrr: '$799',
    billingCycle: 'Annual',
    renewalDate: '2027-01-10',
    contactPerson: 'Lars Lindqvist',
    email: 'people@solaria.se',
    phone: '+46 8 123 4567',
    country: 'Sweden',
    joinedDate: '2024-05-22'
  },
  {
    id: 'COMP-08',
    name: 'Kobe Robotics',
    slug: 'kobe-robotics',
    industry: 'Industrial Automation',
    plan: 'Starter',
    status: 'Suspended',
    employees: 42,
    maxEmployees: 50,
    mrr: '$0 (Overdue)',
    billingCycle: 'Monthly',
    renewalDate: '2026-10-01',
    contactPerson: 'Kenji Sato',
    email: 'billing@koberobotics.jp',
    phone: '+81 3 5555 0143',
    country: 'Japan',
    joinedDate: '2024-01-11'
  }
];

const DEFAULT_PLANS = [
  {
    id: 'PLAN-01',
    name: 'Starter Tier',
    price: '$49',
    period: '/month',
    annualPrice: '$470/yr',
    description: 'Perfect for fast-growing startups and boutique teams up to 50 members.',
    maxEmployees: 50,
    subscribers: 58,
    mrr: '$2,842',
    features: [
      'Up to 50 employees',
      'Employee Self-Service Portal',
      'Attendance Tracking & Time Logs',
      'Leave Management & Approvals',
      'Standard Payslip Generation',
      'Email Support (24h SLA)'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'PLAN-02',
    name: 'Professional Tier',
    price: '$199',
    period: '/month',
    annualPrice: '$1,990/yr',
    description: 'Tailored for scaling businesses requiring advanced HR workflows & analytics.',
    maxEmployees: 250,
    subscribers: 64,
    mrr: '$12,736',
    features: [
      'Up to 250 employees',
      'All 5 Specialized Portals',
      'Biometric & Kiosk Clock-in',
      'Recruitment & Pipeline Kanban',
      'Onboarding Automation',
      'Performance Reviews & OKRs',
      'Multi-currency Payroll',
      'Priority Support (4h SLA)'
    ],
    isPopular: true,
    status: 'Active'
  },
  {
    id: 'PLAN-03',
    name: 'Enterprise Tier',
    price: '$499',
    period: '/month',
    annualPrice: '$4,990/yr',
    description: 'Robust infrastructure and dedicated governance for mid-to-large organizations.',
    maxEmployees: 1000,
    subscribers: 20,
    mrr: '$9,980',
    features: [
      'Up to 1,000 employees',
      'Custom Roles & Granular Permissions',
      'Dedicated Account Manager',
      'SSO & SAML 2.0 Integration',
      'Advanced Audit & Compliance Logs',
      'Custom Document Storage',
      '1-hr Urgent Phone & Slack SLA'
    ],
    isPopular: false,
    status: 'Active'
  },
  {
    id: 'PLAN-04',
    name: 'Custom Enterprise',
    price: '$1,299',
    period: '/month',
    annualPrice: 'Custom quote',
    description: 'Bespoke deployments, tailored integrations, and dedicated multi-region hosting.',
    maxEmployees: 'Unlimited',
    subscribers: 4,
    mrr: '$5,196',
    features: [
      'Unlimited employees',
      'Dedicated Private Cloud / On-Prem',
      'Custom Data Residency',
      '99.99% Uptime Guarantee SLA',
      'Bespoke API Connectors',
      'White-label Custom Branding'
    ],
    isPopular: false,
    status: 'Active'
  }
];

const DEFAULT_PAYMENTS = [
  {
    id: 'TXN-9841',
    invoiceNo: 'INV-2026-089',
    company: 'Nexus BioHealth Labs',
    amount: '$3,800.00',
    date: '2026-10-24',
    status: 'Paid',
    method: 'Corporate Wire (ACH)',
    plan: 'Enterprise (Annual)',
    billingPeriod: 'Oct 2026 - Oct 2027'
  },
  {
    id: 'TXN-9840',
    invoiceNo: 'INV-2026-088',
    company: 'Acme Technologies Inc.',
    amount: '$2,499.00',
    date: '2026-10-21',
    status: 'Paid',
    method: 'Credit Card (Visa •••• 4012)',
    plan: 'Enterprise (Monthly)',
    billingPeriod: 'Oct 2026'
  },
  {
    id: 'TXN-9839',
    invoiceNo: 'INV-2026-087',
    company: 'FinVantage Wealth Partners',
    amount: '$1,850.00',
    date: '2026-10-18',
    status: 'Paid',
    method: 'Corporate Wire',
    plan: 'Enterprise (Annual)',
    billingPeriod: 'Oct 2026 - Oct 2027'
  },
  {
    id: 'TXN-9838',
    invoiceNo: 'INV-2026-086',
    company: 'Apex Global Logistics',
    amount: '$999.00',
    date: '2026-10-15',
    status: 'Pending',
    method: 'Direct Debit (SEPA)',
    plan: 'Professional (Monthly)',
    billingPeriod: 'Oct 2026'
  },
  {
    id: 'TXN-9837',
    invoiceNo: 'INV-2026-085',
    company: 'Solaria Clean Energy',
    amount: '$799.00',
    date: '2026-10-10',
    status: 'Paid',
    method: 'MasterCard •••• 9821',
    plan: 'Professional (Monthly)',
    billingPeriod: 'Oct 2026'
  },
  {
    id: 'TXN-9836',
    invoiceNo: 'INV-2026-084',
    company: 'Kobe Robotics',
    amount: '$49.00',
    date: '2026-10-02',
    status: 'Failed',
    method: 'Credit Card (Expired)',
    plan: 'Starter (Monthly)',
    billingPeriod: 'Oct 2026'
  },
  {
    id: 'TXN-9835',
    invoiceNo: 'INV-2026-083',
    company: 'Veritas Media Group',
    amount: '$49.00',
    date: '2026-09-28',
    status: 'Paid',
    method: 'Amex •••• 1004',
    plan: 'Starter (Monthly)',
    billingPeriod: 'Sep 2026'
  }
];

const DEFAULT_ATTENDANCE = [
  { id: 'ATT-101', empId: 'EMP001', name: 'Sophia Chen', department: 'Engineering', date: '2026-10-27', checkIn: '09:12 AM', checkOut: '--:--', status: 'Present', workHours: '6h 45m' },
  { id: 'ATT-102', empId: 'EMP002', name: 'Marcus Sterling', department: 'Engineering', date: '2026-10-27', checkIn: '08:50 AM', checkOut: '--:--', status: 'Present', workHours: '7h 05m' },
  { id: 'ATT-103', empId: 'EMP003', name: 'Claire Bennett', department: 'People & HR', date: '2026-10-27', checkIn: '09:05 AM', checkOut: '--:--', status: 'Present', workHours: '6h 50m' },
  { id: 'ATT-104', empId: 'EMP004', name: 'Elena Rostova', department: 'Executive', date: '2026-10-27', checkIn: '08:30 AM', checkOut: '--:--', status: 'Present', workHours: '7h 25m' },
  { id: 'ATT-105', empId: 'EMP006', name: 'Liam Gallagher', department: 'Engineering', date: '2026-10-27', checkIn: '09:42 AM', checkOut: '--:--', status: 'Late', workHours: '6h 15m' },
  { id: 'ATT-106', empId: 'EMP007', name: 'Aisha Patel', department: 'Product & Design', date: '2026-10-27', checkIn: '09:00 AM', checkOut: '--:--', status: 'Present', workHours: '6h 55m' },
  { id: 'ATT-107', empId: 'EMP008', name: 'David Kim', department: 'Marketing', date: '2026-10-27', checkIn: '09:15 AM', checkOut: '--:--', status: 'Present', workHours: '6h 40m' },
  { id: 'ATT-108', empId: 'EMP009', name: 'Rachel Green', department: 'Sales & BD', date: '2026-10-27', checkIn: '--:--', checkOut: '--:--', status: 'On Leave', workHours: '0h 0m' },
  { id: 'ATT-109', empId: 'EMP010', name: 'Noah Campbell', department: 'Engineering', date: '2026-10-27', checkIn: '08:55 AM', checkOut: '--:--', status: 'Present', workHours: '7h 00m' },
  { id: 'ATT-110', empId: 'EMP011', name: 'Zoe Martinez', department: 'People & HR', date: '2026-10-27', checkIn: '09:02 AM', checkOut: '--:--', status: 'Present', workHours: '6h 53m' },
  { id: 'ATT-111', empId: 'EMP012', name: 'Ethan Ross', department: 'Finance & Legal', date: '2026-10-27', checkIn: '--:--', checkOut: '--:--', status: 'Absent', workHours: '0h 0m' },
];

const DEFAULT_LEAVES = [
  {
    id: 'LR-001',
    empId: 'EMP009',
    name: 'Rachel Green',
    role: 'Enterprise Account Executive',
    department: 'Sales & BD',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    type: 'Annual Leave',
    fromDate: '2026-10-26',
    toDate: '2026-10-30',
    days: 5,
    reason: 'Family reunion trip to visit grandparents abroad.',
    status: 'Approved',
    appliedOn: '2026-10-18',
    approver: 'Elena Rostova'
  },
  {
    id: 'LR-002',
    empId: 'EMP006',
    name: 'Liam Gallagher',
    role: 'Frontend UI/UX Specialist',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    type: 'Sick Leave',
    fromDate: '2026-11-02',
    toDate: '2026-11-03',
    days: 2,
    reason: 'Scheduled oral wisdom teeth extraction and post-op recovery.',
    status: 'Pending',
    appliedOn: '2026-10-25',
    approver: 'Marcus Sterling'
  },
  {
    id: 'LR-003',
    empId: 'EMP008',
    name: 'David Kim',
    role: 'Growth Marketing Director',
    department: 'Marketing',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    type: 'Casual Leave',
    fromDate: '2026-11-06',
    toDate: '2026-11-06',
    days: 1,
    reason: 'Personal administrative appointment at municipal city office.',
    status: 'Pending',
    appliedOn: '2026-10-26',
    approver: 'Elena Rostova'
  },
  {
    id: 'LR-004',
    empId: 'EMP001',
    name: 'Sophia Chen',
    role: 'Senior Full Stack Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    type: 'Annual Leave',
    fromDate: '2026-11-23',
    toDate: '2026-11-27',
    days: 5,
    reason: 'Thanksgiving holiday week off with family.',
    status: 'Approved',
    appliedOn: '2026-10-12',
    approver: 'Marcus Sterling'
  },
  {
    id: 'LR-007',
    empId: 'EMP001',
    name: 'Sophia Chen',
    role: 'Senior Full Stack Engineer',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    type: 'Casual Leave',
    fromDate: '2026-10-19',
    toDate: '2026-10-19',
    days: 1,
    reason: 'Personal urgent appointment.',
    status: 'Approved',
    appliedOn: '2026-10-10',
    approver: 'Marcus Sterling'
  },
  {
    id: 'LR-005',
    empId: 'EMP010',
    name: 'Noah Campbell',
    role: 'DevOps & Cloud Architect',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    type: 'Compensatory Off',
    fromDate: '2026-10-19',
    toDate: '2026-10-19',
    days: 1,
    reason: 'Worked on Sunday critical database migration window.',
    status: 'Approved',
    appliedOn: '2026-10-14',
    approver: 'Marcus Sterling'
  },
  {
    id: 'LR-006',
    empId: 'EMP012',
    name: 'Ethan Ross',
    role: 'Senior Financial Analyst',
    department: 'Finance & Legal',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    type: 'Sick Leave',
    fromDate: '2026-10-15',
    toDate: '2026-10-16',
    days: 2,
    reason: 'Seasonal viral flu and high temperature.',
    status: 'Rejected',
    appliedOn: '2026-10-15',
    approver: 'Elena Rostova'
  }
];

const DEFAULT_DEPARTMENTS = [
  { id: 'DEP-01', name: 'Engineering', head: 'Marcus Sterling', staffCount: 42, budget: '$1,450,000', openJobs: 4, location: 'San Francisco & Remote' },
  { id: 'DEP-02', name: 'Product & Design', head: 'Aisha Patel', staffCount: 16, budget: '$620,000', openJobs: 2, location: 'London & SF' },
  { id: 'DEP-03', name: 'People & HR', head: 'Claire Bennett', staffCount: 12, budget: '$480,000', openJobs: 1, location: 'San Francisco HQ' },
  { id: 'DEP-04', name: 'Marketing & Brand', head: 'David Kim', staffCount: 18, budget: '$750,000', openJobs: 3, location: 'San Francisco HQ' },
  { id: 'DEP-05', name: 'Sales & Business Dev', head: 'Rachel Green', staffCount: 24, budget: '$920,000', openJobs: 5, location: 'Remote Global' },
  { id: 'DEP-06', name: 'Finance & Legal', head: 'Ethan Ross', staffCount: 10, budget: '$410,000', openJobs: 1, location: 'London Hub' },
];

const DEFAULT_DESIGNATIONS = [
  { id: 'DES-01', title: 'Senior Full Stack Engineer', department: 'Engineering', grade: 'L5', baseSalary: '$125,000', staffCount: 8 },
  { id: 'DES-02', title: 'Engineering Lead', department: 'Engineering', grade: 'L6', baseSalary: '$155,000', staffCount: 4 },
  { id: 'DES-03', title: 'Lead Product Designer', department: 'Product & Design', grade: 'L5', baseSalary: '$130,000', staffCount: 3 },
  { id: 'DES-04', title: 'Head of People Operations', department: 'People & HR', grade: 'L6', baseSalary: '$140,000', staffCount: 1 },
  { id: 'DES-05', title: 'Talent Acquisition Partner', department: 'People & HR', grade: 'L3', baseSalary: '$95,000', staffCount: 3 },
  { id: 'DES-06', title: 'Enterprise Account Executive', department: 'Sales & BD', grade: 'L4', baseSalary: '$115,000', staffCount: 6 },
  { id: 'DES-07', title: 'DevOps & Cloud Architect', department: 'Engineering', grade: 'L5', baseSalary: '$138,000', staffCount: 3 },
  { id: 'DES-08', title: 'Senior Financial Analyst', department: 'Finance & Legal', grade: 'L4', baseSalary: '$105,000', staffCount: 2 }
];

const DEFAULT_TEAMS = [
  { id: 'TEAM-01', name: 'Core Platform Guild', department: 'Engineering', lead: 'Marcus Sterling', members: 8, project: 'Microservices & DB Scaling' },
  { id: 'TEAM-02', name: 'UI/UX Design Systems', department: 'Product & Design', lead: 'Aisha Patel', members: 6, project: 'Design Token Standardization' },
  { id: 'TEAM-03', name: 'Growth & Inbound Funnel', department: 'Marketing', lead: 'David Kim', members: 7, project: 'SEO & Landing Experiments' },
  { id: 'TEAM-04', name: 'Talent & Culture Team', department: 'People & HR', lead: 'Claire Bennett', members: 5, project: 'Global 2027 Onboarding' },
  { id: 'TEAM-05', name: 'Enterprise Accounts', department: 'Sales & BD', lead: 'Rachel Green', members: 9, project: 'Fortune 500 SaaS Expansion' },
];

const DEFAULT_LOCATIONS = [
  { id: 'LOC-01', name: 'San Francisco HQ', address: '500 Howard Street, Suite 400', city: 'San Francisco, CA', country: 'United States', timezone: 'PST (UTC-8)', capacity: 180, activeEmployees: 65, isHQ: true },
  { id: 'LOC-02', name: 'Austin Tech Center', address: '301 Congress Ave, Floor 12', city: 'Austin, TX', country: 'United States', timezone: 'CST (UTC-6)', capacity: 80, activeEmployees: 28, isHQ: false },
  { id: 'LOC-03', name: 'London Regional Hub', address: '1 Canada Square, Canary Wharf', city: 'London', country: 'United Kingdom', timezone: 'GMT (UTC+0)', capacity: 60, activeEmployees: 22, isHQ: false },
  { id: 'LOC-04', name: 'Remote Worldwide', address: 'Distributed Cloud Workforce', city: 'Global', country: 'Worldwide', timezone: 'Multiple Timezones', capacity: 1000, activeEmployees: 13, isHQ: false },
];

const DEFAULT_SHIFTS = [
  { id: 'SH-01', name: 'Standard Day Shift', startTime: '09:00 AM', endTime: '06:00 PM', gracePeriod: '15 mins', breakDuration: '60 mins', activeEmployees: 84, days: 'Mon - Fri' },
  { id: 'SH-02', name: 'Early Bird Shift', startTime: '07:00 AM', endTime: '04:00 PM', gracePeriod: '15 mins', breakDuration: '60 mins', activeEmployees: 18, days: 'Mon - Fri' },
  { id: 'SH-03', name: 'Evening Coverage Shift', startTime: '02:00 PM', endTime: '11:00 PM', gracePeriod: '20 mins', breakDuration: '60 mins', activeEmployees: 14, days: 'Mon - Fri' },
  { id: 'SH-04', name: 'Flexible Core Hours', startTime: '10:00 AM', endTime: '04:00 PM (Core)', gracePeriod: 'Flexible', breakDuration: 'Flexible', activeEmployees: 12, days: 'Mon - Fri' },
];

const DEFAULT_NOTICES = [
  { id: 'NTC-01', title: 'Q4 2026 Global All-Hands & Product Roadmap', author: 'Elena Rostova', department: 'Executive', date: '2026-10-25', priority: 'High', content: 'Join us this Thursday at 10:00 AM PST for our quarterly company-wide town hall. We will cover revenue milestones, client case studies, and the 2027 technical vision.' },
  { id: 'NTC-02', title: 'Open Enrollment for Health & Dental Coverage 2027', author: 'Claire Bennett', department: 'People & HR', date: '2026-10-22', priority: 'High', content: 'Annual benefits open enrollment begins next Monday. Review all medical, dental, and vision plans in the employee portal documents before November 15.' },
  { id: 'NTC-03', title: 'Annual Employee Performance Review Cycle Begins', author: 'Claire Bennett', department: 'People & HR', date: '2026-10-18', priority: 'Medium', content: 'Self-evaluations are now open under the Performance tab. Please complete your reviews by November 10th to assist your managers.' },
  { id: 'NTC-04', title: 'Office Security & Clean Desk Policy Refresh', author: 'Alexander Vance', department: 'Security & Compliance', date: '2026-10-10', priority: 'Low', content: 'Friendly reminder to lock computer screens when away from desks and shred confidential physical papers in the blue recycling bins.' }
];

const DEFAULT_TICKETS = [
  { id: 'TCK-501', ticketNo: 'TICK-8921', requester: 'Acme Technologies Inc.', role: 'Super Admin Ticket', subject: 'Requesting SSO Integration for Okta', category: 'Authentication', priority: 'High', status: 'In Progress', createdAt: '2026-10-26 14:32' },
  { id: 'TCK-502', ticketNo: 'TICK-8920', requester: 'Nexus BioHealth Labs', role: 'Super Admin Ticket', subject: 'Customized HIPAA Audit Log Export', category: 'Compliance', priority: 'Critical', status: 'Open', createdAt: '2026-10-26 11:15' },
  { id: 'TCK-503', ticketNo: 'TICK-8919', requester: 'Liam Gallagher', role: 'Employee Ticket', subject: 'Tax deduction mismatch on September Payslip', category: 'Payroll', priority: 'Medium', status: 'Resolved', createdAt: '2026-10-22 09:40' },
  { id: 'TCK-504', ticketNo: 'TICK-8918', requester: 'Apex Global Logistics', role: 'Super Admin Ticket', subject: 'Invoice currency adjustment to GBP', category: 'Billing', priority: 'Low', status: 'Resolved', createdAt: '2026-10-20 16:50' },
  { id: 'TCK-505', ticketNo: 'TICK-8917', requester: 'Sophia Chen', role: 'Employee Ticket', subject: 'New 4K External Monitor request for desk', category: 'IT Hardware', priority: 'Low', status: 'In Progress', createdAt: '2026-10-19 13:20' }
];

const DEFAULT_AUDIT_LOGS = [
  { id: 'AUD-01', action: 'Company Provisioned', actor: 'Alexander Vance (Super Admin)', target: 'HyperScale AI Labs', ip: '198.51.100.24', timestamp: '2026-10-27 15:42:10', status: 'Success' },
  { id: 'AUD-02', action: 'Salary Package Updated', actor: 'Elena Rostova (Admin)', target: 'Liam Gallagher (EMP006)', ip: '192.168.1.104', timestamp: '2026-10-27 14:15:00', status: 'Success' },
  { id: 'AUD-03', action: 'Leave Request Approved', actor: 'Marcus Sterling (Manager)', target: 'Sophia Chen (EMP001)', ip: '192.168.1.88', timestamp: '2026-10-27 11:20:45', status: 'Success' },
  { id: 'AUD-04', action: 'Plan Upgrade Initiated', actor: 'Sarah Connor (Acme Tech)', target: 'Enterprise Tier', ip: '203.0.113.45', timestamp: '2026-10-26 18:02:11', status: 'Success' },
  { id: 'AUD-05', action: 'Biometric Kiosk Synced', actor: 'System Daemon', target: 'Terminal #3 San Francisco', ip: '10.0.0.12', timestamp: '2026-10-26 09:00:00', status: 'Success' },
  { id: 'AUD-06', action: 'Failed Admin Login Attempt', actor: 'Unknown IP', target: 'admin@hrduo.com', ip: '45.33.32.156', timestamp: '2026-10-25 22:14:03', status: 'Warning' }
];

const DEFAULT_CORRECTIONS = [
  { id: 'COR-01', empId: 'EMP006', name: 'Liam Gallagher', date: '2026-10-26', originalCheckIn: 'Missed', requestedCheckIn: '09:00 AM', reason: 'Badge reader offline during morning arrival', status: 'Pending' },
  { id: 'COR-02', empId: 'EMP001', name: 'Sophia Chen', date: '2026-10-24', originalCheckIn: '10:15 AM', requestedCheckIn: '08:45 AM', reason: 'Attended client offsite kickoff directly', status: 'Approved' },
  { id: 'COR-03', empId: 'EMP010', name: 'Noah Campbell', date: '2026-10-23', originalCheckIn: 'Missed', requestedCheckIn: '09:05 AM', reason: 'Forgot physical lanyard at home', status: 'Approved' }
];

const DEFAULT_HOLIDAYS = [
  { date: '2026-10-12', day: 'Monday', name: 'Indigenous Peoples / Columbus Day', type: 'Public Holiday', status: 'Passed' },
  { date: '2026-10-30', day: 'Friday', name: 'Autumn Company Holiday', type: 'Company Holiday', status: 'Upcoming' },
  { date: '2026-11-26', day: 'Thursday', name: 'Thanksgiving Day', type: 'Public Holiday', status: 'Upcoming' },
  { date: '2026-11-27', day: 'Friday', name: 'Day After Thanksgiving', type: 'Company Holiday', status: 'Upcoming' },
  { date: '2026-12-24', day: 'Thursday', name: 'Christmas Eve (Half Day)', type: 'Company Holiday', status: 'Upcoming' },
  { date: '2026-12-25', day: 'Friday', name: 'Christmas Day', type: 'Public Holiday', status: 'Upcoming' },
  { date: '2026-12-31', day: 'Thursday', name: 'New Year’s Eve', type: 'Company Holiday', status: 'Upcoming' },
  { date: '2027-01-01', day: 'Friday', name: 'New Year’s Day', type: 'Public Holiday', status: 'Upcoming' },
  { date: '2027-01-18', day: 'Monday', name: 'Martin Luther King Jr. Day', type: 'Public Holiday', status: 'Upcoming' },
  { date: '2027-05-31', day: 'Monday', name: 'Memorial Day', type: 'Public Holiday', status: 'Upcoming' }
];

export const HRMSProvider = ({ children }) => {
  // Load or initialize state with localStorage
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`hrduo_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const [employees, setEmployees] = useState(() => loadState('employees', DEFAULT_EMPLOYEES));
  const [companies, setCompanies] = useState(() => loadState('companies', DEFAULT_COMPANIES));
  const [plans, setPlans] = useState(() => loadState('plans', DEFAULT_PLANS));
  const [payments, setPayments] = useState(() => loadState('payments', DEFAULT_PAYMENTS));
  const [attendance, setAttendance] = useState(() => loadState('attendance', DEFAULT_ATTENDANCE));
  const [leaves, setLeaves] = useState(() => loadState('leaves', DEFAULT_LEAVES));
  const [departments, setDepartments] = useState(() => loadState('departments', DEFAULT_DEPARTMENTS));
  const [designations, setDesignations] = useState(() => loadState('designations', DEFAULT_DESIGNATIONS));
  const [teams, setTeams] = useState(() => loadState('teams', DEFAULT_TEAMS));
  const [locations, setLocations] = useState(() => loadState('locations', DEFAULT_LOCATIONS));
  const [shifts, setShifts] = useState(() => loadState('shifts', DEFAULT_SHIFTS));
  const [notices, setNotices] = useState(() => loadState('notices', DEFAULT_NOTICES));
  const [tickets, setTickets] = useState(() => loadState('tickets', DEFAULT_TICKETS));
  const [auditLogs, setAuditLogs] = useState(() => loadState('auditLogs', DEFAULT_AUDIT_LOGS));
  const [corrections, setCorrections] = useState(() => loadState('corrections', DEFAULT_CORRECTIONS));
  const [holidays, setHolidays] = useState(() => loadState('holidays', DEFAULT_HOLIDAYS));

  // Employee check-in state simulation
  const [isCheckedIn, setIsCheckedIn] = useState(() => {
    const saved = localStorage.getItem('hrduo_isCheckedIn');
    return saved === 'true';
  });
  const [checkInTime, setCheckInTime] = useState(() => {
    return localStorage.getItem('hrduo_checkInTime') || '09:12 AM';
  });
  const [checkOutTime, setCheckOutTime] = useState(() => {
    return localStorage.getItem('hrduo_checkOutTime') || '--:--';
  });

  // Sync state to localStorage whenever modified
  useEffect(() => { localStorage.setItem('hrduo_employees', JSON.stringify(employees)); }, [employees]);
  useEffect(() => { localStorage.setItem('hrduo_companies', JSON.stringify(companies)); }, [companies]);
  useEffect(() => { localStorage.setItem('hrduo_plans', JSON.stringify(plans)); }, [plans]);
  useEffect(() => { localStorage.setItem('hrduo_payments', JSON.stringify(payments)); }, [payments]);
  useEffect(() => { localStorage.setItem('hrduo_attendance', JSON.stringify(attendance)); }, [attendance]);
  useEffect(() => { localStorage.setItem('hrduo_leaves', JSON.stringify(leaves)); }, [leaves]);
  useEffect(() => { localStorage.setItem('hrduo_departments', JSON.stringify(departments)); }, [departments]);
  useEffect(() => { localStorage.setItem('hrduo_designations', JSON.stringify(designations)); }, [designations]);
  useEffect(() => { localStorage.setItem('hrduo_teams', JSON.stringify(teams)); }, [teams]);
  useEffect(() => { localStorage.setItem('hrduo_locations', JSON.stringify(locations)); }, [locations]);
  useEffect(() => { localStorage.setItem('hrduo_shifts', JSON.stringify(shifts)); }, [shifts]);
  useEffect(() => { localStorage.setItem('hrduo_notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { localStorage.setItem('hrduo_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('hrduo_auditLogs', JSON.stringify(auditLogs)); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('hrduo_corrections', JSON.stringify(corrections)); }, [corrections]);

  // Actions
  const addEmployee = (emp) => {
    const newId = `EMP${String(employees.length + 1).padStart(3, '0')}`;
    const newEmp = {
      id: newId,
      empId: newId,
      name: emp.name || 'New Employee',
      email: emp.email || `${emp.name?.toLowerCase().replace(/\s+/g, '.')}@hrduo.com`,
      phone: emp.phone || '+1 (555) 000-0000',
      department: emp.department || 'Engineering',
      role: emp.role || 'Software Engineer',
      userRole: emp.userRole || 'EMPLOYEE',
      status: emp.status || 'Active',
      employmentType: emp.employmentType || 'Full-time',
      joiningDate: emp.joiningDate || new Date().toISOString().split('T')[0],
      salary: emp.salary || '$95,000',
      manager: emp.manager || 'Marcus Sterling',
      location: emp.location || 'San Francisco HQ',
      avatar: emp.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name || newId}`,
      leaveBalance: { casual: 8, sick: 10, annual: 15, total: 33 },
      performanceRating: 5.0
    };
    setEmployees(prev => [newEmp, ...prev]);
    return { success: true, employee: newEmp };
  };

  const updateEmployee = (id, updated) => {
    setEmployees(prev => prev.map(emp => (emp.id === id || emp.empId === id) ? { ...emp, ...updated } : emp));
    return { success: true };
  };

  const deleteEmployee = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id && emp.empId !== id));
    return { success: true };
  };

  const toggleCheckIn = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (!isCheckedIn) {
      setIsCheckedIn(true);
      setCheckInTime(timeStr);
      setCheckOutTime('--:--');
      localStorage.setItem('hrduo_isCheckedIn', 'true');
      localStorage.setItem('hrduo_checkInTime', timeStr);
      localStorage.setItem('hrduo_checkOutTime', '--:--');

      // Update Sophia Chen in attendance
      setAttendance(prev => prev.map(a => a.empId === 'EMP001' ? {
        ...a,
        checkIn: timeStr,
        checkOut: '--:--',
        status: 'Present'
      } : a));

      return { status: 'checked_in', time: timeStr };
    } else {
      setIsCheckedIn(false);
      setCheckOutTime(timeStr);
      localStorage.setItem('hrduo_isCheckedIn', 'false');
      localStorage.setItem('hrduo_checkOutTime', timeStr);

      setAttendance(prev => prev.map(a => a.empId === 'EMP001' ? {
        ...a,
        checkOut: timeStr
      } : a));

      return { status: 'checked_out', time: timeStr };
    }
  };

  const applyLeave = (leaveData) => {
    const newLeave = {
      id: `LR-${String(leaves.length + 1).padStart(3, '0')}`,
      empId: leaveData.empId || 'EMP001',
      name: leaveData.name || 'Sophia Chen',
      role: leaveData.role || 'Senior Full Stack Engineer',
      department: leaveData.department || 'Engineering',
      avatar: leaveData.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      type: leaveData.type || 'Casual Leave',
      fromDate: leaveData.fromDate,
      toDate: leaveData.toDate,
      days: parseInt(leaveData.days || 1, 10),
      reason: leaveData.reason || 'Personal leave request',
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
      approver: 'Marcus Sterling'
    };
    setLeaves(prev => [newLeave, ...prev]);
    return { success: true, leave: newLeave };
  };

  const updateLeaveStatus = (leaveId, newStatus) => {
    setLeaves(prev => prev.map(item => item.id === leaveId ? { ...item, status: newStatus } : item));
    return { success: true };
  };

  const addCompany = (companyData) => {
    const newComp = {
      id: `COMP-${String(companies.length + 1).padStart(2, '0')}`,
      name: companyData.name,
      slug: companyData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      industry: companyData.industry || 'Technology',
      plan: companyData.plan || 'Professional',
      status: 'Active',
      employees: parseInt(companyData.employees || 25, 10),
      maxEmployees: parseInt(companyData.maxEmployees || 100, 10),
      mrr: companyData.mrr || '$999',
      billingCycle: companyData.billingCycle || 'Monthly',
      renewalDate: '2027-10-27',
      contactPerson: companyData.contactPerson || 'Company Admin',
      email: companyData.email || 'contact@company.com',
      phone: companyData.phone || '+1 800 555 0100',
      country: companyData.country || 'United States',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCompanies(prev => [newComp, ...prev]);
    return { success: true, company: newComp };
  };

  const updateCompanyStatus = (id, newStatus) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    return { success: true };
  };

  const addDepartment = (deptData) => {
    const newDept = {
      id: `DEP-${String(departments.length + 1).padStart(2, '0')}`,
      name: deptData.name,
      head: deptData.head || 'Unassigned',
      staffCount: parseInt(deptData.staffCount || 0, 10),
      budget: deptData.budget || '$250,000',
      openJobs: parseInt(deptData.openJobs || 1, 10),
      location: deptData.location || 'San Francisco HQ'
    };
    setDepartments(prev => [...prev, newDept]);
    return { success: true, department: newDept };
  };

  const addNotice = (noticeData) => {
    const newNotice = {
      id: `NTC-${String(notices.length + 1).padStart(2, '0')}`,
      title: noticeData.title,
      author: noticeData.author || 'Company Admin',
      department: noticeData.department || 'All Departments',
      date: new Date().toISOString().split('T')[0],
      priority: noticeData.priority || 'Medium',
      content: noticeData.content
    };
    setNotices(prev => [newNotice, ...prev]);
    return { success: true, notice: newNotice };
  };

  const addTicket = (ticketData) => {
    const newTicket = {
      id: `TCK-${String(tickets.length + 501)}`,
      ticketNo: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      requester: ticketData.requester || 'Sophia Chen',
      role: ticketData.role || 'Employee Ticket',
      subject: ticketData.subject,
      category: ticketData.category || 'General HR Support',
      priority: ticketData.priority || 'Medium',
      status: 'Open',
      createdAt: new Date().toLocaleString()
    };
    setTickets(prev => [newTicket, ...prev]);
    return { success: true, ticket: newTicket };
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => (t.id === ticketId || t.ticketNo === ticketId) ? { ...t, status: newStatus } : t));
    return { success: true };
  };

  const approveCorrection = (id, newStatus) => {
    setCorrections(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    return { success: true };
  };

  return (
    <HRMSContext.Provider value={{
      employees,
      companies,
      plans,
      payments,
      attendance,
      leaves,
      departments,
      designations,
      teams,
      locations,
      shifts,
      notices,
      tickets,
      auditLogs,
      corrections,
      holidays,
      isCheckedIn,
      checkInTime,
      checkOutTime,
      toggleCheckIn,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      applyLeave,
      updateLeaveStatus,
      addCompany,
      updateCompanyStatus,
      addDepartment,
      addNotice,
      addTicket,
      updateTicketStatus,
      approveCorrection
    }}>
      {children}
    </HRMSContext.Provider>
  );
};

export const useHRMS = () => {
  const context = useContext(HRMSContext);
  if (!context) {
    throw new Error('useHRMS must be used within an HRMSProvider');
  }
  return context;
};
