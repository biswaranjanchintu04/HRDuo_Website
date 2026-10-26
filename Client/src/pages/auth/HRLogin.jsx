import React from 'react';
import Login from './Login';
import { Users2 } from 'lucide-react';

export default function HRLogin() {
  return (
    <Login
      roleTitle="HR Portal"
      role="HR"
      defaultEmail="hr@hrduo.com"
      icon={Users2}
      accentColor="#E11D48"
    />
  );
}
