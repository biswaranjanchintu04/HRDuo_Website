import React from 'react';
import Login from './Login';

export default function EmployeeLogin() {
  return (
    <Login
      roleTitle="Employee Portal"
      role="EMPLOYEE"
      defaultEmail="emp@hrduo.com"
    />
  );
}
