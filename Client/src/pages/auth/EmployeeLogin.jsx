import React from 'react';
import Login from './Login';

export default function EmployeeLogin() {
  return (
    <Login
      roleTitle="Employee Self-Service"
      role="EMPLOYEE"
      defaultEmail="emp@hrduo.com"
    />
  );
}
