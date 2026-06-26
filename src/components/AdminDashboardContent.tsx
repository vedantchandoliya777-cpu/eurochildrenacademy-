/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, Award, DollarSign, CheckCircle, Bell, ArrowRight, Mail, 
  FileText, UserPlus, Sparkles, School, AlertCircle, CalendarRange, Clock, CreditCard, Download
} from 'lucide-react';
import { Student, Transaction, BusRoute, Staff, AttendanceRecord } from '../types';
import { SCHOOL_INFO } from '../schoolData';
import { generateSchoolReportHTML, downloadHTMLFile } from '../utils/htmlGenerator';

interface AdminDashboardContentProps {
  students: Student[];
  transactions: Transaction[];
  staffList?: Staff[];
  busRoutes?: BusRoute[];
  attendanceRecords?: AttendanceRecord[];
  setView: (view: string) => void;
  setActiveModule: (module: string) => void;
  userRole: 'admin' | 'teacher' | 'parent';
}

export default function AdminDashboardContent({
  students,
  transactions,
  staffList = [],
  busRoutes = [],
  attendanceRecords = [],
  setView,
  setActiveModule,
  userRole
}: AdminDashboardContentProps) {
  const [feeFilter, setFeeFilter] = useState<'All' | 'Paid' | 'Pending'>('All');

  // Aggregated values
  const totalStudentsCount = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  
  // Calculate total fee revenues
  const totalFeesExpected = students.reduce((sum, s) => sum + s.feesTotal, 0);
  const totalFeesCollected = students.reduce((sum, s) => sum + s.feesPaid, 0);
  const totalOutstanding = totalFeesExpected - totalFeesCollected;

  // Recent transactions formatted
  const filteredTransactions = transactions.filter(t => {
    if (feeFilter === 'All') return true;
    return t.status === feeFilter;
  });

  const handleAdmissionClick = () => {
    setView('admission');
  };

  // 1. Parent/Student View of the Dashboard
  if (userRole === 'parent') {
    // Parent profile is tied to student "Aarav Sharma" (id STU-2601)
    const myStudent = students.find(s => s.id === 'STU-2601') || students[0];
    const myTransactions = transactions.filter(t => t.studentName === myStudent.name);
    const myOutstanding = myStudent.feesTotal - myStudent.feesPaid;

    return (
      <div className="space-y-6">
        {/* Welcome card */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div>
              <span className="bg-yellow-500 text-blue-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                PARENT PORTAL ACTIVE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 leading-tight">Welcome back, Mr. Rajesh Sharma</h2>
              <p className="text-blue-200 text-sm mt-1">Here is the academic and fees status for your ward <span className="font-bold text-yellow-400">{myStudent.name}</span>.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-xs text-yellow-400 font-bold self-start sm:self-center">
              Student ID: {myStudent.id}
            </div>
          </div>
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-900 mr-4">
              <School className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Class & Section</p>
              <h3 className="text-xl font-extrabold text-blue-950 mt-1">{myStudent.class}</h3>
              <p className="text-xs text-gray-500 mt-1">Roll No: {myStudent.rollNo}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className="bg-green-100 p-4 rounded-2xl text-green-700 mr-4">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Overall Attendance</p>
              <h3 className="text-xl font-extrabold text-green-700 mt-1">94%</h3>
              <p className="text-xs text-gray-500 mt-1">Current term status: Good</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className={`p-4 rounded-2xl mr-4 ${myOutstanding > 0 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Outstanding Dues</p>
              <h3 className="text-xl font-extrabold text-gray-800 mt-1">₹{myOutstanding.toLocaleString()}</h3>
              <p className="text-xs text-gray-500 mt-1">Paid: ₹{myStudent.feesPaid.toLocaleString()} / ₹{myStudent.feesTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* My receipts */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <h3 className="text-lg font-black text-blue-950">Payment History & Receipts</h3>
              <button 
                onClick={() => setActiveModule('fees')}
                className="text-xs text-blue-900 font-bold hover:underline"
              >
                Access Invoice ERP
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="text-gray-400 font-bold border-b border-gray-100/80">
                    <th className="pb-3">Transaction ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Receipt No</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myTransactions.map((trx, idx) => (
                    <tr key={idx} className="border-b border-gray-50/80 hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 font-mono font-bold text-blue-900">{trx.id}</td>
                      <td className="py-4 text-gray-600">{trx.date}</td>
                      <td className="py-4 font-semibold text-gray-700">{trx.receiptNo}</td>
                      <td className="py-4 font-black text-gray-800">{trx.amount}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${trx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {myTransactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-400 font-medium">No recorded transactions for this student.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Parent */}
          <div className="lg:col-span-4 bg-gradient-to-b from-blue-950 to-blue-900 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-extrabold mb-4 text-yellow-500">Quick Actions</h3>
              <p className="text-xs text-blue-200 leading-relaxed mb-6">Access key student features directly with instant credentials verification.</p>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setActiveModule('fees')}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/10 py-3 px-4 rounded-xl text-left flex items-center text-xs font-semibold cursor-pointer transition-colors"
                >
                  <CreditCard className="h-4 w-4 mr-3 text-yellow-400" /> Pay Fees Online (Gateway)
                </button>
                <button 
                  onClick={() => setActiveModule('transport')}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/10 py-3 px-4 rounded-xl text-left flex items-center text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Clock className="h-4 w-4 mr-3 text-sky-400" /> Live GPS Bus Tracker
                </button>
                <button 
                  onClick={() => setActiveModule('attendance')}
                  className="w-full bg-white/10 hover:bg-white/15 border border-white/10 py-3 px-4 rounded-xl text-left flex items-center text-xs font-semibold cursor-pointer transition-colors"
                >
                  <CalendarRange className="h-4 w-4 mr-3 text-green-400" /> Attendance Calendar
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-center">
              <span className="text-[10px] text-blue-300 font-bold tracking-widest uppercase">Support: +91 9887053997</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Super Admin Dashboard Content
  return (
    <div className="space-y-6">
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Enrolled Students", value: totalStudentsCount, desc: `${activeStudents} Active Students`, icon: Users, color: "bg-blue-600 shadow-blue-100" },
          { title: "Staff Members", value: "56", desc: "Teaching & Administration", icon: Award, color: "bg-indigo-600 shadow-indigo-100" },
          { title: "Fees Collected", value: `₹${(totalFeesCollected / 100000).toFixed(1)}L`, desc: `Expected: ₹${(totalFeesExpected / 100000).toFixed(1)}L`, icon: DollarSign, color: "bg-green-600 shadow-green-100" },
          { title: "Outstanding Dues", value: `₹${(totalOutstanding / 100000).toFixed(1)}L`, desc: `${((totalFeesCollected / totalFeesExpected) * 100).toFixed(0)}% Collection ratio`, icon: AlertCircle, color: "bg-amber-500 shadow-amber-100" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center hover:shadow-md transition-shadow">
            <div className={`${stat.color} p-4 rounded-2xl text-white mr-4 shadow-lg`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-extrabold uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-2xl font-black text-blue-950 mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tables & actions row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Transaction log */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-blue-950">Recent Fee Transactions</h3>
              <p className="text-xs text-gray-400">Manage real-time receipts and invoice clearances</p>
            </div>
            
            {/* Filters */}
            <div className="flex bg-slate-100 rounded-xl p-1 text-xs gap-1 self-start sm:self-center">
              {(['All', 'Paid', 'Pending'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFeeFilter(f)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${feeFilter === f ? 'bg-white text-blue-950 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="text-gray-400 font-bold border-b border-gray-100/80">
                  <th className="pb-3">Receipt No</th>
                  <th className="pb-3">Student Profile</th>
                  <th className="pb-3">Standard</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((trx, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50/40 transition-colors">
                    <td className="py-4">
                      <div className="font-mono font-bold text-blue-950">{trx.receiptNo}</div>
                      <span className="text-[10px] text-gray-400 mt-0.5 block">{trx.date} • {trx.type}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-900 font-bold text-xs flex items-center justify-center mr-3">
                          {trx.studentName.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-800">{trx.studentName}</span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600 font-medium">{trx.class}</td>
                    <td className="py-4 font-bold text-gray-900">{trx.amount}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${trx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400 font-medium">No recorded transactions match the filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tools Panel */}
        <div className="lg:col-span-4 bg-gradient-to-b from-blue-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-extrabold text-white">Administrative Tools</h3>
            </div>
            
            <p className="text-xs text-blue-200 leading-relaxed">Direct credentials access to admissions routing, bulk parent communication channels, and report generators.</p>
            
            <div className="space-y-3">
              <button 
                onClick={handleAdmissionClick}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/10 py-3.5 px-4 rounded-xl text-left flex items-center text-xs font-bold transition-colors cursor-pointer group"
                id="tool-admit-student"
              >
                <UserPlus className="h-5 w-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform" /> 
                Admit New Student Form
              </button>
              
              <button 
                onClick={() => { alert("Sending bulk automated update... Success! SMS and WhatsApp dispatches have been queued for 1,542 parents."); }}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/10 py-3.5 px-4 rounded-xl text-left flex items-center text-xs font-bold transition-colors cursor-pointer group"
                id="tool-bulk-sms"
              >
                <Mail className="h-5 w-5 mr-3 text-sky-400 group-hover:scale-110 transition-transform" /> 
                Dispatch Bulk SMS / WhatsApp
              </button>

              <button 
                onClick={() => { setActiveModule('fees'); }}
                className="w-full bg-white/10 hover:bg-white/15 border border-white/10 py-3.5 px-4 rounded-xl text-left flex items-center text-xs font-bold transition-colors cursor-pointer group"
                id="tool-defaulter-list"
              >
                <FileText className="h-5 w-5 mr-3 text-green-400 group-hover:scale-110 transition-transform" /> 
                Track Fee Defaulter List
              </button>

              <button 
                onClick={() => {
                  const html = generateSchoolReportHTML(
                    students,
                    transactions,
                    staffList,
                    busRoutes,
                    attendanceRecords
                  );
                  downloadHTMLFile(html, `ECA_School_ERP_Snapshot_2026.html`);
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-brand-950 py-3.5 px-4 rounded-xl text-left flex items-center text-xs font-black transition-colors cursor-pointer group shadow-lg shadow-amber-500/10 mt-3"
                id="tool-download-html"
              >
                <Download className="h-5 w-5 mr-3 text-brand-950 group-hover:scale-110 transition-transform animate-pulse" /> 
                Download Standalone HTML Report
              </button>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-center text-[10px] text-blue-300 font-bold tracking-widest uppercase">
            ECA ERP ACADEMIC YEAR {SCHOOL_INFO.session}
          </div>
        </div>

      </div>

    </div>
  );
}
