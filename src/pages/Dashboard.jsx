import React from 'react';
import { Users, Calendar, Activity, Stethoscope, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Chart from '../components/Chart';

const Dashboard = () => {
    // Sample data for charts
    const patientData = [
        { name: 'Jan', value: 120 },
        { name: 'Feb', value: 150 },
        { name: 'Mar', value: 180 },
        { name: 'Apr', value: 200 },
        { name: 'May', value: 220 },
        { name: 'Jun', value: 250 },
    ];

    const appointmentData = [
        { name: 'Mon', value: 45 },
        { name: 'Tue', value: 52 },
        { name: 'Wed', value: 38 },
        { name: 'Thu', value: 61 },
        { name: 'Fri', value: 48 },
        { name: 'Sat', value: 35 },
        { name: 'Sun', value: 28 },
    ];

    const diagnosisData = [
        { name: 'Cardiology', value: 35 },
        { name: 'Neurology', value: 25 },
        { name: 'Dermatology', value: 20 },
        { name: 'Orthopedics', value: 20 },
    ];

    const aiActivityLogs = [
        { id: 1, action: 'AI Diagnosis Generated', patient: 'John Doe', time: '2 min ago', status: 'success' },
        { id: 2, action: 'Risk Assessment Completed', patient: 'Jane Smith', time: '5 min ago', status: 'success' },
        { id: 3, action: 'Treatment Recommendation', patient: 'Mike Johnson', time: '8 min ago', status: 'warning' },
        { id: 4, action: 'Health Report Analyzed', patient: 'Sarah Wilson', time: '12 min ago', status: 'success' },
        { id: 5, action: 'Emergency Alert Triggered', patient: 'David Brown', time: '15 min ago', status: 'error' },
    ];

    const statsCards = [
        {
            title: 'Total Patients',
            value: '2,847',
            change: '+12%',
            changeType: 'positive',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Appointments Today',
            value: '47',
            change: '+8%',
            changeType: 'positive',
            icon: Calendar,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            title: 'AI Reports Generated',
            value: '1,234',
            change: '+23%',
            changeType: 'positive',
            icon: Activity,
            color: 'text-pink-600',
            bgColor: 'bg-pink-50',
        },
        {
            title: 'Doctors on Duty',
            value: '12',
            change: '+2',
            changeType: 'positive',
            icon: Stethoscope,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
        },
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'warning':
                return <AlertCircle className="w-4 h-4 text-yellow-500" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your healthcare system.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} hover className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                    <div className="flex items-center space-x-1">
                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                        <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                                        <span className="text-sm text-gray-500">from last month</span>
                                    </div>
                                </div>
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Patient Growth Chart */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Patient Growth</h3>
                        <p className="text-sm text-gray-600">Monthly patient registration trends</p>
                    </div>
                    <Chart type="line" data={patientData} height={300} />
                </Card>

                {/* Appointments Chart */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Weekly Appointments</h3>
                        <p className="text-sm text-gray-600">Appointment distribution by day</p>
                    </div>
                    <Chart type="bar" data={appointmentData} height={300} />
                </Card>
            </div>

            {/* Diagnosis Distribution and AI Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Diagnosis Distribution */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Diagnosis Distribution</h3>
                        <p className="text-sm text-gray-600">AI diagnosis by medical specialty</p>
                    </div>
                    <Chart type="pie" data={diagnosisData} height={300} />
                </Card>

                {/* AI Activity Logs */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">AI Activity Logs</h3>
                        <p className="text-sm text-gray-600">Recent AI system activities</p>
                    </div>
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {aiActivityLogs.map((log) => (
                            <div key={log.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                {getStatusIcon(log.status)}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {log.action}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {log.patient} • {log.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center space-x-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-xl transition-colors duration-200">
                        <Users className="w-5 h-5 text-pink-600" />
                        <span className="font-medium text-pink-600">Add New Patient</span>
                    </button>
                    <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-600">Schedule Appointment</span>
                    </button>
                    <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors duration-200">
                        <Activity className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-600">Generate AI Report</span>
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
