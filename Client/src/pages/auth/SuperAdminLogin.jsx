import React from 'react';
import Login from './Login';

export default function SuperAdminLogin() {
  return (
    <Login
      roleTitle="Super Admin Console"
      role="SUPER_ADMIN"
      defaultEmail="root@hrduo.internal"
    />
  );
}
