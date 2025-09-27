import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import EmployeeDashboard from './Dashboards/EmployeeDashboard';
import ManagerDashboard from './Dashboards/ManagerDashboard';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
                                {user?.role}
                            </span>
                        </div>
                        <button 
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = '/login';
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {user?.role === 'employee' && <EmployeeDashboard user={user} />}
            {(user?.role === 'manager' || user?.role === 'admin') && <ManagerDashboard user={user} />}
        </div>
    );
};

export default Dashboard;
