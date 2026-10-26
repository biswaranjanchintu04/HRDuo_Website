import React from 'react';
import Login from './Login';
import { Briefcase } from 'lucide-react';

export default function ManagerLogin() {
  return (
    <Login
      roleTitle="Manager Portal"
      role="MANAGER"
      defaultEmail="manager@hrduo.com"
      icon={Briefcase}
      accentColor="#7C3AED"
    />
  );
}
