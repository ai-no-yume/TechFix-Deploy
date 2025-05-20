import EmployeeDAO from '../dao/EmployeeDAO';
import { useState } from 'react';

export default function EmployeeRule() {
    const [employeeDAO] = useState(new EmployeeDAO());

    const checkInputByType = (value, type) => {
        let regex;

        if (type === 'id') {
            regex = /^\d{7,11}$/;
        } else if (type === 'name') {
            regex = /^[\p{L}\s]+$/u;
        } else if (type === 'email') {
            regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        } else if (type === 'mobile') {
            regex = /^3\d{9}$/;
        } else if (type === 'address') {
            // regex = /^[a-zA-Z0-9\s,#.-]+$/;
            regex = /^[\p{L}0-9\s,#.\-]+$/u;
        } else if (type === 'role') {
            regex = /^[\p{L}0-9\s\-#]+$/u;
        }

        return regex.test(value);
    };

    const saveEmployee = async (employee) => {
        console.log('Sending to DAO the employee:', employee);
        return await employeeDAO.saveEmployee(employee);
    };

    const getEmployeesByStatus = async (status) => {
        if (status === 'All') {
            return await employeeDAO.getAllEmployees();
        } else {
            return await employeeDAO.getEmployeesByStatus(status);
        }
    };

    const getEmployeeById = async (employeeId) => {
        return await employeeDAO.getEmployeeByIdentification(employeeId);
    };

    const unsubscribeEmployee = async (employeeId) => {
        return await employeeDAO.updateEmployeeStatusById(employeeId, false);
    };

    const subscribeEmployee = async (employeeId) => {
        return await employeeDAO.updateEmployeeStatusById(employeeId, true);
    };

    return {
        checkInputByType,
        saveEmployee,
        getEmployeesByStatus,
        getEmployeeById,
        unsubscribeEmployee,
        subscribeEmployee
    };
}
