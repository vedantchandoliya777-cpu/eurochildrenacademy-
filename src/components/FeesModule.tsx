/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DollarSign, Search, PlusCircle, CreditCard, Check, Printer, X, DownloadCloud, AlertTriangle } from 'lucide-react';
import { Student, Transaction } from '../types';

interface FeesModuleProps {
  students: Student[];
  transactions: Transaction[];
  onAddTransaction: (studentName: string, stdClass: string, amount: string, type: 'Tuition' | 'Admission' | 'Transport' | 'Library' | 'Exam') => void;
  userRole: 'admin' | 'teacher' | 'parent';
}

export default function FeesModule({
  students,
  transactions,
  onAddTransaction,
  userRole
}: FeesModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Fully Paid' | 'Pending Dues'>('All');
  
  // Pay Fee Modal States
  const [showPayModal, setShowPayModal] = useState(false);
  const [targetStudent, setTargetStudent] = useState<Student | null>(null);
  const [payAmount, setPayAmount] = useState('');
  const [payType, setPayType] = useState<'Tuition' | 'Admission' | 'Transport' | 'Library' | 'Exam'>('Tuition');
  const [successPayment, setSuccessPayment] = useState(false);

  // Filter students based on role and options
  const displayedStudents = students.filter(s => {
    // Parent sees only Aarav Sharma (id STU-2601)
    if (userRole === 'parent' && s.id !== 'STU-2601') {
      return false;
    }
    
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.class.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'Fully Paid') {
      return matchesSearch && s.feesPaid >= s.feesTotal;
    }
    if (statusFilter === 'Pending Dues') {
      return matchesSearch && s.feesPaid < s.feesTotal;
    }
    return matchesSearch;
  });

  const handleOpenPayModal = (student: Student) => {
    setTargetStudent(student);
    const outstanding = student.feesTotal - student.feesPaid;
    setPayAmount(outstanding.toString());
    setShowPayModal(true);
    setSuccessPayment(false);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudent || !payAmount) return;
    
    const amtNumber = parseFloat(payAmount);
    if (isNaN(amtNumber) || amtNumber <= 0) {
      alert("Please specify a valid payment amount.");
      return;
    }

    onAddTransaction(
      targetStudent.name,
      targetStudent.class,
      `₹${amtNumber.toLocaleString()}`,
      payType
    );

    setSuccessPayment(true);
    setTimeout(() => {
      setShowPayModal(false);
      setSuccessPayment(false);
      setTargetStudent(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Metrics Row */}
      {userRole !== 'parent' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Fees Collection Rate</span>
              <h3 className="text-2xl font-black text-blue-950 mt-1">
                {((students.reduce((acc, s) => acc + s.feesPaid, 0) / students.reduce((acc, s) => acc + s.feesTotal, 0)) * 100).toFixed(1)}%
              </h3>
            </div>
            <div className="bg-green-100 text-green-700 p-3.5 rounded-2xl">
              <Check className="h-6 w-6" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Fully Cleared Accounts</span>
              <h3 className="text-2xl font-black text-blue-950 mt-1">
                {students.filter(s => s.feesPaid >= s.feesTotal).length} Students
              </h3>
            </div>
            <div className="bg-blue-100 text-blue-900 p-3.5 rounded-2xl">
              <Check className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Pending Defaulters</span>
              <h3 className="text-2xl font-black text-amber-700 mt-1">
                {students.filter(s => s.feesPaid < s.feesTotal).length} Students
              </h3>
            </div>
            <div className="bg-amber-100 text-amber-700 p-3.5 rounded-2xl">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
        </div>
      )}

      {/* Control Strip */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="h-4.5 w-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={userRole === 'parent' ? "View fee profile..." : "Search student ID, name, or standard class..."}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-xs sm:text-sm border border-transparent focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none transition-all" 
          />
        </div>

        {userRole !== 'parent' && (
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs gap-1 w-full md:w-auto">
            {(['All', 'Fully Paid', 'Pending Dues'] as const).map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg font-bold transition-all cursor-pointer text-center ${statusFilter === f ? 'bg-white text-blue-950 shadow-sm' : 'text-gray-500 hover:text-gray-950'}`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-extrabold text-blue-950 text-base">{userRole === 'parent' ? "My Ward Fee Records" : "Active Student Fee Ledgers"}</h3>
        </div>

        <div className="overflow-x-auto text-sm text-left">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-400 font-bold bg-slate-50 border-b border-gray-100">
                <th className="p-4">Student Profile</th>
                <th className="p-4">Class</th>
                <th className="p-4">Total Amount Expected</th>
                <th className="p-4">Total Amount Paid</th>
                <th className="p-4">Dues Remaining</th>
                <th className="p-4 text-center">Clearance Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedStudents.map((student) => {
                const outstanding = student.feesTotal - student.feesPaid;
                const isPaid = outstanding <= 0;

                return (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-slate-50/40 transition-colors">
                    <td className="p-4">
                      <div>
                        <div className="font-bold text-blue-950">{student.name}</div>
                        <span className="text-[10px] text-gray-400 font-bold block mt-0.5">ID: {student.id}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-gray-600">{student.class}</td>
                    <td className="p-4 font-bold text-gray-800">₹{student.feesTotal.toLocaleString()}</td>
                    <td className="p-4 font-bold text-green-700">₹{student.feesPaid.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`font-black ${outstanding > 0 ? 'text-amber-600' : 'text-gray-400'}`}>
                        ₹{outstanding.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        isPaid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {isPaid ? 'Fully Paid' : 'Pending Dues'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {isPaid ? (
                        <button 
                          onClick={() => alert(`Generating fully cleared receipt PDF for ${student.name}... Receipt dispatched to parents email.`)}
                          className="text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-xl cursor-pointer"
                        >
                          <Printer className="h-3.5 w-3.5 inline mr-1" /> Receipt
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleOpenPayModal(student)}
                          className="text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 px-3 py-1.5 rounded-xl flex items-center gap-1 inline-flex cursor-pointer"
                          id={`pay-fee-btn-${student.id}`}
                        >
                          <CreditCard className="h-3.5 w-3.5" /> 
                          {userRole === 'parent' ? "Pay Fee" : "Collect Fee"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {displayedStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-400 font-medium py-12">No student fee records matched.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pay / Collect Dues Modal */}
      {showPayModal && targetStudent && (
        <div className="fixed inset-0 bg-blue-950/45 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden relative">
            <button 
              onClick={() => setShowPayModal(false)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-blue-950 p-6 text-white text-center">
              <DollarSign className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-extrabold text-lg">ECA Fee Collection Receipt</h4>
              <p className="text-xs text-blue-200 mt-1">Record or clear dues for {targetStudent.name}</p>
            </div>

            {successPayment ? (
              <div className="p-8 text-center space-y-4">
                <div className="h-12 w-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Check className="h-6 w-6" />
                </div>
                <h5 className="font-bold text-gray-800 text-lg">Payment Recorded Successfully!</h5>
                <p className="text-sm text-gray-500">The amount of ₹{parseFloat(payAmount).toLocaleString()} has been appended to {targetStudent.name}'s paid accounts. Invoice receipt has been sent to +91 {targetStudent.contact}.</p>
              </div>
            ) : (
              <form onSubmit={handleProcessPayment} className="p-6 space-y-5">
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Student Profile</span>
                    <span className="font-bold text-blue-950">{targetStudent.name} ({targetStudent.class})</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1.5 border-t border-gray-200/50">
                    <span className="text-gray-400">Total Cleared</span>
                    <span className="font-semibold text-green-700">₹{targetStudent.feesPaid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs pt-1.5 border-t border-gray-200/50">
                    <span className="text-gray-400">Dues Outstanding</span>
                    <span className="font-black text-amber-600">₹{(targetStudent.feesTotal - targetStudent.feesPaid).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Receipt Payment Category</label>
                  <select 
                    value={payType}
                    onChange={e => setPayType(e.target.value as any)}
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                    id="receipt-category"
                  >
                    <option value="Tuition">Tuition Fees</option>
                    <option value="Admission">Admission Registration Fees</option>
                    <option value="Transport">School Bus Transport Fees</option>
                    <option value="Library">Library Deposit</option>
                    <option value="Exam">Terminal Board Examination Fees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Payment Amount (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    max={targetStudent.feesTotal - targetStudent.feesPaid}
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-bold" 
                    id="receipt-amount-field"
                  />
                  <p className="text-[10px] text-gray-400 font-semibold mt-1">Maximum collection limit: ₹{(targetStudent.feesTotal - targetStudent.feesPaid).toLocaleString()}</p>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-extrabold rounded-xl shadow-lg transition-colors cursor-pointer text-center text-sm"
                  id="process-pay-submit"
                >
                  Generate Payment Receipt
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
