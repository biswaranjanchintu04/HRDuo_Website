/**
 * Biometric Face Attendance API Service (Mock & Interactive Demo)
 */

export const checkInWithFace = async (payload) => {
  // Simulate network verification & biometric vector similarity search
  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    actionType: 'CHECK_IN',
    status: 'Verified',
    userName: 'Alex Johnson',
    userId: '1042',
    employeeCode: 'EMP-1042',
    department: 'Product & Engineering',
    checkInTime: new Date().toISOString(),
    workHours: null,
  };
};

export const checkOutWithFace = async (payload) => {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return {
    actionType: 'CHECK_OUT',
    status: 'Verified',
    userName: 'Alex Johnson',
    userId: '1042',
    employeeCode: 'EMP-1042',
    department: 'Product & Engineering',
    checkInTime: new Date(Date.now() - 8.25 * 3600 * 1000).toISOString(),
    checkOutTime: new Date().toISOString(),
    workHours: '8.25',
  };
};

export default {
  checkInWithFace,
  checkOutWithFace,
};
