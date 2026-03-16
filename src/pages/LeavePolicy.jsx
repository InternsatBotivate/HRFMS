import React, { useState } from 'react';
import { Search, Calendar, User, FileText, Info, Users, UserCheck, UserX, Clock, Plus, X } from 'lucide-react';

const LeavePolicy = () => {
    const [activeTab, setActiveTab] = useState('leaves');
    const [searchTerm, setSearchTerm] = useState('');
    const [showHolidayModal, setShowHolidayModal] = useState(false);
    const [showOvertimeModal, setShowOvertimeModal] = useState(false);
    const [holidayFormData, setHolidayFormData] = useState({
        date: '',
        day: '',
        name: ''
    });
    const [overtimeFormData, setOvertimeFormData] = useState({
        employeeId: '',
        employeeName: '',
        date: '',
        hours: ''
    });

    const holidays = [
        { date: '01/01/2026', day: 'Wednesday', name: 'New Year\'s Day' },
        { date: '26/01/2026', day: 'Monday', name: 'Republic Day' },
        { date: '14/03/2026', day: 'Saturday', name: 'Maha Shivratri' },
        { date: '27/03/2026', day: 'Friday', name: 'Holi' },
        { date: '10/04/2026', day: 'Friday', name: 'Good Friday' },
        { date: '14/04/2026', day: 'Tuesday', name: 'Ambedkar Jayanti' },
        { date: '01/05/2026', day: 'Friday', name: 'May Day' },
        { date: '15/08/2026', day: 'Saturday', name: 'Independence Day' },
        { date: '02/10/2026', day: 'Friday', name: 'Gandhi Jayanti' },
        { date: '21/10/2026', day: 'Wednesday', name: 'Dussehra' },
        { date: '01/11/2026', day: 'Sunday', name: 'Diwali' },
        { date: '25/12/2026', day: 'Friday', name: 'Christmas Day' },
    ];

    const leaveStats = [
        { type: 'Normal Leave (NL)', total: '08 Days', bg: 'bg-red-100', text: 'text-red-600', icon: UserX },
        { type: 'Earned Leave (EL)', total: '08 Days', bg: 'bg-green-100', text: 'text-green-600', icon: UserCheck },
        { type: 'Casual Leave (CL)', total: '08 Days', bg: 'bg-amber-100', text: 'text-amber-600', icon: Clock },
        { type: 'Total Leave', total: '24 Days', bg: 'bg-blue-100', text: 'text-blue-600', icon: Users },
    ];

    const employeeLeaves = [
        { id: 'EMP001', name: 'John Doe', designation: 'Software Engineer', nl: 2, el: 5, cl: 1, total: 8, overtime: 12 },
        { id: 'EMP002', name: 'Jane Smith', designation: 'UI Designer', nl: 1, el: 3, cl: 2, total: 6, overtime: 8 },
        { id: 'EMP003', name: 'Michael Brown', designation: 'Project Manager', nl: 0, el: 8, cl: 1, total: 9, overtime: 15 },
        { id: 'EMP004', name: 'Sarah Wilson', designation: 'QA Lead', nl: 3, el: 4, cl: 3, total: 10, overtime: 10 },
        { id: 'EMP005', name: 'David Lee', designation: 'HR Executive', nl: 2, el: 2, cl: 0, total: 4, overtime: 5 },
        { id: 'EMP006', name: 'Emily Chen', designation: 'Frontend Developer', nl: 1, el: 6, cl: 1, total: 8, overtime: 14 },
        { id: 'EMP007', name: 'Robert Taylor', designation: 'Backend Developer', nl: 4, el: 2, cl: 2, total: 8, overtime: 18 },
    ];

    const filteredHolidays = holidays.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.date.includes(searchTerm)
    );

    const filteredEmployees = employeeLeaves.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleHolidayInputChange = (e) => {
        const { name, value } = e.target;
        setHolidayFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddHoliday = (e) => {
        e.preventDefault();
        // Just mocking the add functionality as per "don't change other output"
        setShowHolidayModal(false);
        setHolidayFormData({ date: '', day: '', name: '' });
    };

    const handleOvertimeInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'employeeId') {
            const selectedEmp = employeeLeaves.find(emp => emp.id === value);
            setOvertimeFormData(prev => ({
                ...prev,
                employeeId: value,
                employeeName: selectedEmp ? selectedEmp.name : ''
            }));
        } else if (name === 'employeeName') {
            const selectedEmp = employeeLeaves.find(emp => emp.name === value);
            setOvertimeFormData(prev => ({
                ...prev,
                employeeName: value,
                employeeId: selectedEmp ? selectedEmp.id : ''
            }));
        } else {
            setOvertimeFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddOvertime = (e) => {
        e.preventDefault();
        // Just mocking the add functionality
        setShowOvertimeModal(false);
        setOvertimeFormData({ employeeId: '', employeeName: '', date: '', hours: '' });
    };

    const renderHolidayTable = () => (
        <table className="min-w-full divide-y divide-white">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holiday Name</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white">
                {filteredHolidays.length > 0 ? (
                    filteredHolidays.map((item, index) => (
                        <tr key={index} className="hover:bg-white text-sm text-gray-500">
                            <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{item.day}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.name}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-12 text-center text-gray-500">No holidays found.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    const renderOvertimeTable = () => (
        <table className="min-w-full divide-y divide-white">
            <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Overtime (Hours)</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp, index) => (
                        <tr key={index} className="hover:bg-white text-sm text-gray-500">
                            <td className="px-6 py-4 whitespace-nowrap">{emp.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{emp.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{emp.designation}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-indigo-600 font-bold">{emp.overtime} hrs</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">No overtime data found.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );

    const renderEmployeeLeaveDisplay = () => (
        <div className="space-y-8">
            <div className="flex flex-wrap lg:flex-nowrap gap-4">
                {leaveStats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="flex-1 min-w-[180px] bg-white rounded-xl shadow-md border border-gray-100 p-4 flex items-center transition-all hover:shadow-lg">
                            <div className={`p-3 rounded-xl ${stat.bg} mr-4 shrink-0`}>
                                <Icon size={22} className={stat.text} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider truncate">{stat.type.split(' (')[0]}</p>
                                <div className="flex items-baseline gap-1">
                                    <h3 className="text-xl font-bold text-gray-800">{stat.total.split(' ')[0]}</h3>
                                    <span className="text-[10px] text-gray-400 font-medium">Days</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <User size={20} className="text-indigo-600" />
                    Employee Leave Summary (Taken)
                </h3>
                <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
                    <table className="min-w-full divide-y divide-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">NL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">EL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">CL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center font-bold text-indigo-600">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((emp, index) => (
                                    <tr key={index} className="hover:bg-white text-sm text-gray-500">
                                        <td className="px-6 py-4 whitespace-nowrap">{emp.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{emp.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{emp.designation}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-red-600 font-medium">{emp.nl}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-green-600 font-medium">{emp.el}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-blue-600 font-medium">{emp.cl}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-indigo-700 bg-indigo-50/30">{emp.total}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">No employee data found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Leave Policy</h1>
            </div>

            <div className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex flex-1 max-w-md">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </div>
                </div>

                {activeTab === 'holidays' && (
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        onClick={() => setShowHolidayModal(true)}
                    >
                        <Plus size={16} className="mr-2" />
                        Add Holiday
                    </button>
                )}

                {activeTab === 'overtime' && (
                    <button
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                        onClick={() => setShowOvertimeModal(true)}
                    >
                        <Plus size={16} className="mr-2" />
                        Add Overtime
                    </button>
                )}
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => { setActiveTab('leaves'); setSearchTerm(''); }}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${activeTab === 'leaves'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Employee Yearly Leave
                        </button>
                        <button
                            onClick={() => { setActiveTab('holidays'); setSearchTerm(''); }}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${activeTab === 'holidays'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Company Holiday List
                        </button>
                        <button
                            onClick={() => { setActiveTab('overtime'); setSearchTerm(''); }}
                            className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${activeTab === 'overtime'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            Overtime
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    <div className="overflow-x-auto scrollbar-hide">
                        {activeTab === 'holidays' ? renderHolidayTable() : activeTab === 'overtime' ? renderOvertimeTable() : renderEmployeeLeaveDisplay()}
                    </div>
                </div>
            </div>

            {/* Add Holiday Modal */}
            {/* Same logic for showHolidayModal omitted for brevity but I'll add the Overtime modal below it */}
            {showHolidayModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Add New Holiday</h2>
                            <button onClick={() => setShowHolidayModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddHoliday} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={holidayFormData.date}
                                    onChange={handleHolidayInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Day *</label>
                                <select
                                    name="day"
                                    value={holidayFormData.day}
                                    onChange={handleHolidayInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select Day</option>
                                    <option value="Monday">Monday</option>
                                    <option value="Tuesday">Tuesday</option>
                                    <option value="Wednesday">Wednesday</option>
                                    <option value="Thursday">Thursday</option>
                                    <option value="Friday">Friday</option>
                                    <option value="Saturday">Saturday</option>
                                    <option value="Sunday">Sunday</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter holiday name"
                                    value={holidayFormData.name}
                                    onChange={handleHolidayInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowHolidayModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-lg"
                                >
                                    Save Holiday
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Overtime Modal */}
            {showOvertimeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">Add Overtime</h2>
                            <button onClick={() => setShowOvertimeModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddOvertime} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
                                <select
                                    name="employeeId"
                                    value={overtimeFormData.employeeId}
                                    onChange={handleOvertimeInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    required
                                >
                                    <option value="">Select Employee ID</option>
                                    {employeeLeaves.map(emp => (
                                        <option key={emp.id} value={emp.id}>{emp.id}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name *</label>
                                <select
                                    name="employeeName"
                                    value={overtimeFormData.employeeName}
                                    onChange={handleOvertimeInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                                    required
                                >
                                    <option value="">Select Employee Name</option>
                                    {employeeLeaves.map(emp => (
                                        <option key={emp.id} value={emp.name}>{emp.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={overtimeFormData.date}
                                    onChange={handleOvertimeInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hours *</label>
                                <input
                                    type="number"
                                    name="hours"
                                    placeholder="Enter hours"
                                    value={overtimeFormData.hours}
                                    onChange={handleOvertimeInputChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowOvertimeModal(false)}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors shadow-lg"
                                >
                                    Save Overtime
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LeavePolicy;




