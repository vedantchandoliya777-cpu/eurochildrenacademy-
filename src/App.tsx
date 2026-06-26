/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  SCHOOL_INFO, 
  INITIAL_STUDENTS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_BUS_ROUTES, 
  INITIAL_STAFF, 
  INITIAL_ATTENDANCE 
} from './schoolData';
import { Student, Transaction, BusRoute, Staff, AttendanceRecord } from './types';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AdmissionForm from './components/AdmissionForm';
import LoginScreen from './components/LoginScreen';
import AdminLayout from './components/AdminLayout';
import AdminDashboardContent from './components/AdminDashboardContent';
import TransportModule from './components/TransportModule';
import FeesModule from './components/FeesModule';
import StudentsModule from './components/StudentsModule';
import AttendanceModule from './components/AttendanceModule';
import StaffModule from './components/StaffModule';
import SettingsModule from './components/SettingsModule';

export default function App() {
  const [view, setView] = useState<string>('home'); // home, admission, login, admin-dashboard
  const [adminModule, setAdminModule] = useState<string>('dashboard'); // dashboard, students, fees, attendance, transport, staff, settings
  const [userRole, setUserRole] = useState<'admin' | 'teacher' | 'parent'>('admin');

  // Application database states
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>(INITIAL_BUS_ROUTES);
  const [staffList, setStaffList] = useState<Staff[]>(INITIAL_STAFF);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);

  // 1. Reactive Handlers - Admissions
  const handleAdmitStudent = (newStudent: Omit<Student, 'id' | 'rollNo' | 'status' | 'admissionDate' | 'feesPaid' | 'feesTotal'>) => {
    const nextIdNum = students.length + 1;
    const padNum = nextIdNum < 10 ? `0${nextIdNum}` : `${nextIdNum}`;
    const studentId = `STU-26${padNum}`;
    const rollNo = `10${padNum}`;

    const studentRecord: Student = {
      ...newStudent,
      id: studentId,
      rollNo,
      status: 'Active',
      admissionDate: new Date().toISOString().split('T')[0],
      feesTotal: 25000,
      feesPaid: 4500 // Initial registration fee payment
    };

    // Add admission fee receipt
    const txIdNum = transactions.length + 1;
    const trxRecord: Transaction = {
      id: `TRX-26${txIdNum < 10 ? `0${txIdNum}` : txIdNum}`,
      studentName: newStudent.name,
      class: newStudent.class,
      amount: "₹4,500",
      status: 'Paid',
      date: new Date().toISOString().split('T')[0],
      type: 'Admission',
      receiptNo: `REC-${4300 + txIdNum}`
    };

    setStudents(prev => [studentRecord, ...prev]);
    setTransactions(prev => [trxRecord, ...prev]);
  };

  // 2. Reactive Handlers - Toggle Student Status
  const handleToggleStudentStatus = (id: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'Active' ? 'Inactive' : 'Active'
        };
      }
      return s;
    }));
  };

  // 3. Reactive Handlers - Toggle Staff Status
  const handleToggleStaffStatus = (id: string) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: s.status === 'Active' ? 'On Leave' : 'Active'
        };
      }
      return s;
    }));
  };

  // 4. Reactive Handlers - Add Manual Transaction & Update Student Ledger
  const handleAddTransaction = (
    studentName: string, 
    stdClass: string, 
    amount: string, 
    type: 'Tuition' | 'Admission' | 'Transport' | 'Library' | 'Exam'
  ) => {
    const cleanAmount = parseFloat(amount.replace(/[^\d.]/g, ''));
    if (isNaN(cleanAmount)) return;

    const txIdNum = transactions.length + 1;
    const newTx: Transaction = {
      id: `TRX-26${txIdNum < 10 ? `0${txIdNum}` : txIdNum}`,
      studentName,
      class: stdClass,
      amount,
      status: 'Paid',
      date: new Date().toISOString().split('T')[0],
      type,
      receiptNo: `REC-${5520 + txIdNum}`
    };

    // Update students state to reflect payment in their ledger
    setStudents(prev => prev.map(s => {
      if (s.name.toLowerCase() === studentName.toLowerCase()) {
        const updatedPaid = Math.min(s.feesTotal, s.feesPaid + cleanAmount);
        return {
          ...s,
          feesPaid: updatedPaid
        };
      }
      return s;
    }));

    setTransactions(prev => [newTx, ...prev]);
  };

  // 5. Reactive Handlers - Add Staff
  const handleAddStaff = (newStaff: Omit<Staff, 'id' | 'status' | 'joiningDate'>) => {
    const nextId = staffList.length + 101;
    const staffRecord: Staff = {
      ...newStaff,
      id: `STF-${nextId}`,
      status: 'Active',
      joiningDate: new Date().toISOString().split('T')[0]
    };

    setStaffList(prev => [...prev, staffRecord]);
  };

  // 6. Reactive Handlers - Save Attendance
  const handleUpdateAttendance = (records: AttendanceRecord[]) => {
    // Update central state
    setAttendanceRecords(prev => {
      const filtered = prev.filter(p => !records.some(r => r.studentId === p.studentId));
      return [...filtered, ...records];
    });
  };

  // Render logic based on view state
  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <div className="min-h-screen bg-white selection:bg-yellow-300 selection:text-blue-900 font-sans">
            <Navbar setView={setView} activeView="home" />
            <HeroSection setView={setView} />
            <FeaturesSection />
            <Footer setView={setView} />
          </div>
        );
      case 'admission':
        return (
          <div className="font-sans min-h-screen bg-gray-50 flex flex-col justify-between">
             <Navbar setView={setView} activeView="admission" />
             <AdmissionForm setView={setView} onAdmitStudent={handleAdmitStudent} />
             <Footer setView={setView} />
          </div>
        );
      case 'login':
        return <LoginScreen setView={setView} setUserRole={setUserRole} />;
      case 'admin-dashboard':
        return (
          <AdminLayout 
            setView={setView} 
            activeModule={adminModule} 
            setActiveModule={setAdminModule}
            userRole={userRole}
          >
            {adminModule === 'dashboard' && (
              <AdminDashboardContent 
                students={students} 
                transactions={transactions} 
                staffList={staffList}
                busRoutes={busRoutes}
                attendanceRecords={attendanceRecords}
                setView={setView}
                setActiveModule={setAdminModule}
                userRole={userRole}
              />
            )}
            {adminModule === 'students' && (
              <StudentsModule 
                students={students} 
                onToggleStatus={handleToggleStudentStatus}
                onAdmitStudent={handleAdmitStudent}
              />
            )}
            {adminModule === 'fees' && (
              <FeesModule 
                students={students} 
                transactions={transactions} 
                onAddTransaction={handleAddTransaction}
                userRole={userRole}
              />
            )}
            {adminModule === 'attendance' && (
              <AttendanceModule 
                students={students} 
                attendanceRecords={attendanceRecords}
                onUpdateAttendance={handleUpdateAttendance}
                userRole={userRole}
              />
            )}
            {adminModule === 'transport' && (
              <TransportModule busRoutes={busRoutes} />
            )}
            {adminModule === 'staff' && (
              <StaffModule 
                staffList={staffList} 
                onToggleStaffStatus={handleToggleStaffStatus}
                onAddStaff={handleAddStaff}
              />
            )}
            {adminModule === 'settings' && (
              <SettingsModule />
            )}
          </AdminLayout>
        );
      default:
        return (
          <div className="p-10 text-center font-sans">
            <h2 className="text-xl font-bold text-red-500">404 - Section Not Found</h2>
            <button onClick={() => setView('home')} className="mt-4 bg-blue-900 text-white px-4 py-2 rounded">
              Return Home
            </button>
          </div>
        );
    }
  };

  return renderView();
}
