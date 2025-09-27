import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmployeeDashboard = ({ user }) => {
    const [leaveStats, setLeaveStats] = useState(null);
    const [recentLeaves, setRecentLeaves] = useState([]);

    useEffect(() => {
        fetchLeaveStats();
        fetchRecentLeaves();
    }, []);

    const fetchLeaveStats = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/leaves/stats', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                setLeaveStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching leave stats:', error);
        }
    };

    const fetchRecentLeaves = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/leaves', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                setRecentLeaves(data.data.slice(0, 5)); // Get last 5 leaves
            }
        } catch (error) {
            console.error('Error fetching recent leaves:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link 
                            to="/leave-application"
                            className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            Apply for Leave
                        </Link>
                        <Link 
                            to="/leave-status"
                            className="block w-full text-center bg-green-500 text-white py-2 rounded hover:bg-green-600"
                        >
                            Check Leave Status
                        </Link>
                    </div>
                </div>

                {/* Leave Balance */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Leave Balance</h2>
                    {leaveStats?.balance && (
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Casual Leave:</span>
                                <span>{leaveStats.balance.casual} days</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Sick Leave:</span>
                                <span>{leaveStats.balance.sick} days</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Annual Leave:</span>
                                <span>{leaveStats.balance.annual} days</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Leave Applications */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
                    <div className="space-y-3">
                        {recentLeaves.map(leave => (
                            <div key={leave._id} className="border-b pb-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">{new Date(leave.startDate).toLocaleDateString()}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                        leave.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                        leave.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {leave.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600">{leave.leaveType}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;