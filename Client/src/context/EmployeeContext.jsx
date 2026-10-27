import React, { createContext, useContext } from 'react';
import { useHRMS } from './HRMSContext';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const hrms = useHRMS();

  const [activeChat, setActiveChat] = React.useState(null);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [employeePage, setEmployeePage] = React.useState(0);
  const [maxUsers, setMaxUsers] = React.useState(250);

  const departmentsList = hrms.departments.map(d => d.name);

  const employeePagination = {
    page: employeePage,
    size: 20,
    totalElements: hrms.employees.length,
    totalPages: Math.ceil(hrms.employees.length / 20) || 1
  };

  const addEmployee = async (employee) => {
    return hrms.addEmployee(employee);
  };

  const addBulkEmployees = async (newEmployees) => {
    newEmployees.forEach(emp => hrms.addEmployee(emp));
    return { success: true, count: newEmployees.length };
  };

  const updateEmployee = async (id, updatedData) => {
    return hrms.updateEmployee(id, updatedData);
  };

  const deleteEmployee = async (id) => {
    return hrms.deleteEmployee(id);
  };

  const resetTodayAttendance = (id) => {
    // simulated
  };

  const fetchEmployees = async () => {
    // no-op frontend mock
  };

  const fetchMaxUsers = async () => {
    // no-op frontend mock
  };

  return (
    <EmployeeContext.Provider value={{
      employees: hrms.employees,
      employeePage,
      employeePagination,
      setEmployeePage,
      maxUsers,
      fetchMaxUsers,
      departmentsList,
      setDepartmentsList: () => {},
      addEmployee,
      addBulkEmployees,
      updateEmployee,
      deleteEmployee,
      resetTodayAttendance,
      fetchEmployees,
      activeChat,
      setActiveChat,
      selectedEmployee,
      setSelectedEmployee
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
