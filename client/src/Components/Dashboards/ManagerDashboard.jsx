import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManagerDashboard = ({ user }) => {
    const [pendingLeaves, setPendingLeaves] = useState([]);
    const [teamStats, setTeamStats] = useState(null);

    useEffect(() => {
        fetchPendingLeaves();
        fetchTeamStats();
    }, []);

    const fetchPendingLeaves = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/leaves/pending', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                setPendingLeaves(data.data);
            }
        } catch (error) {
            console.error('Error fetching pending leaves:', error);
        }
    };

    const fetchTeamStats = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/team/stats', {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            if (data.success) {
                setTeamStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching team stats:', error);
        }
    };

    const handleLeaveAction = async (leaveId, action, remarks = '') => {
        try {
            const response = await fetch(`http://localhost:8000/api/leave/${leaveId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({ action, remarks })
            });
            
            if (response.ok) {
                fetchPendingLeaves(); // Refresh the list
            }
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Pending Approvals */}
                <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Pending Approvals</h2>
                    <div className="space-y-4">
                        {pendingLeaves.map(leave => (
                            <div key={leave._id} className="border p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-medium">{leave.employee.name}</h3>
                                        <p className="text-sm text-gray-600">{leave.leaveType}</p>
                                    </div>
                                    <div className="text-right text-sm">
                                        <p>{new Date(leave.startDate).toLocaleDateString()} - {new Date(leave.endDate).toLocaleDateString()}</p>
                                        <p className="text-gray-600">{leave.numberOfDays} days</p>
                                    </div>
                                </div>
                                <p className="text-sm mb-3">{leave.reason}</p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleLeaveAction(leave._id, 'Approved')}
                                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => {
                                            const remarks = prompt('Enter rejection reason:');
                                            if (remarks) handleLeaveAction(leave._id, 'Rejected', remarks);
                                        }}
                                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                        {pendingLeaves.length === 0 && (
                            <p className="text-gray-500 text-center">No pending leave requests</p>
                        )}
                    </div>
                </div>

                {/* Team Overview */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">Team Overview</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span>Team Members</span>
                            <span className="font-medium">{teamStats?.totalMembers || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>On Leave Today</span>
                            <span className="font-medium">{teamStats?.onLeaveToday || 0}</span>
                        </div>
                        <Link 
                            to="/team-calendar"
                            className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                        >
                            View Team Calendar
                        </Link>
                        <Link 
                            to="/leave-reports"
                            className="block w-full text-center bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
                        >
                            Leave Reports
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;