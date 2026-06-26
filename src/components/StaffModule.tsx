/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Search, PlusCircle, Filter, Phone, Mail, Clock, X, Briefcase } from 'lucide-react';
import { Staff } from '../types';

interface StaffModuleProps {
  staffList: Staff[];
  onToggleStaffStatus: (id: string) => void;
  onAddStaff: (newStaff: Omit<Staff, 'id' | 'status' | 'joiningDate'>) => void;
}

export default function StaffModule({
  staffList,
  onToggleStaffStatus,
  onAddStaff
}: StaffModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  
  // Add Staff Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaffForm, setNewStaffForm] = useState({
    name: '',
    designation: '',
    department: 'Academic' as 'Academic' | 'Administration' | 'Support' | 'Transport',
    contact: '',
    email: '',
    salary: ''
  });

  const filteredStaff = staffList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (deptFilter === 'All') return matchesSearch;
    return matchesSearch && s.department === deptFilter;
  });

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.designation || !newStaffForm.contact) {
      alert("Please fill in all required fields.");
      return;
    }

    onAddStaff({
      name: newStaffForm.name,
      designation: newStaffForm.designation,
      department: newStaffForm.department,
      contact: newStaffForm.contact,
      email: newStaffForm.email || 'staff@eca.edu.in',
      salary: newStaffForm.salary || '₹25,000'
    });

    setShowAddModal(false);
    setNewStaffForm({
      name: '',
      designation: '',
      department: 'Academic',
      contact: '',
      email: '',
      salary: ''
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Control Strip */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        <div className="relative w-full sm:max-w-xs">
          <Search className="h-4.5 w-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search staff name or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none" 
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600">
            <Filter className="h-4 w-4 text-gray-500" />
            <span>Dept:</span>
            <select 
              value={deptFilter}
              onChange={e => setDeptFilter(e.target.value)}
              className="bg-transparent border-none outline-none font-extrabold text-blue-950 pr-4 cursor-pointer"
              id="staff-dept-filter"
            >
              <option value="All">All Departments</option>
              <option value="Academic">Academic</option>
              <option value="Administration">Administration</option>
              <option value="Support">Support</option>
              <option value="Transport">Transport</option>
            </select>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
            id="register-staff-btn"
          >
            <PlusCircle className="h-4.5 w-4.5" /> Register Educator
          </button>
        </div>

      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <div 
            key={staff.id} 
            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            id={`staff-card-${staff.id}`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ID: {staff.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                  staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {staff.status}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 rounded-full bg-slate-100 text-blue-950 font-black text-sm flex items-center justify-center border">
                  {staff.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-blue-950 text-base">{staff.name}</h4>
                  <p className="text-xs text-yellow-600 font-bold uppercase mt-0.5 tracking-wide">{staff.designation}</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-600">
                <div className="flex justify-between">
                  <span>Department</span>
                  <span className="text-gray-800">{staff.department}</span>
                </div>
                <div className="flex justify-between">
                  <span>Salary Slip</span>
                  <span className="text-gray-800">{staff.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span>Joined ECA</span>
                  <span className="text-gray-800">{staff.joiningDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Mobile Contact</span>
                  <span className="text-blue-950 hover:underline">{staff.contact}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>ECA Email</span>
                  <span className="text-blue-950 truncate max-w-[150px]">{staff.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end">
              <button 
                onClick={() => onToggleStaffStatus(staff.id)}
                className={`px-3 py-1.5 rounded-xl font-bold border text-xs transition-colors cursor-pointer ${
                  staff.status === 'Active' 
                    ? 'text-amber-600 hover:bg-amber-50 border-amber-200' 
                    : 'text-green-700 hover:bg-green-50 border-green-200'
                }`}
              >
                {staff.status === 'Active' ? 'Set On Leave' : 'Mark Active'}
              </button>
            </div>
          </div>
        ))}
        {filteredStaff.length === 0 && (
          <p className="col-span-full text-center text-gray-400 font-bold py-12">No educator records match query filters.</p>
        )}
      </div>

      {/* Staff Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-blue-950/45 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-blue-950 p-6 text-white text-center">
              <Briefcase className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-extrabold text-lg">Staff Member Onboarding</h4>
              <p className="text-xs text-blue-200 mt-1">Register a new teacher or administrative employee</p>
            </div>

            <form onSubmit={handleCreateStaff} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Full Employee Name *</label>
                <input 
                  type="text" 
                  required
                  value={newStaffForm.name}
                  onChange={e => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                  placeholder="e.g. Mr. Saini"
                  className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Designation *</label>
                  <input 
                    type="text" 
                    required
                    value={newStaffForm.designation}
                    onChange={e => setNewStaffForm({ ...newStaffForm, designation: e.target.value })}
                    placeholder="e.g. PGT Physics"
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Department *</label>
                  <select 
                    value={newStaffForm.department}
                    onChange={e => setNewStaffForm({ ...newStaffForm, department: e.target.value as any })}
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Administration">Administration</option>
                    <option value="Support">Support</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Contact Mobile *</label>
                  <input 
                    type="tel" 
                    required
                    value={newStaffForm.contact}
                    onChange={e => setNewStaffForm({ ...newStaffForm, contact: e.target.value })}
                    placeholder="10 digit phone"
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Offered Salary *</label>
                  <input 
                    type="text" 
                    required
                    value={newStaffForm.salary}
                    onChange={e => setNewStaffForm({ ...newStaffForm, salary: e.target.value })}
                    placeholder="e.g. ₹35,000"
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">ECA Email Address</label>
                <input 
                  type="email" 
                  value={newStaffForm.email}
                  onChange={e => setNewStaffForm({ ...newStaffForm, email: e.target.value })}
                  placeholder="name@eca.edu.in"
                  className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none" 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-sm rounded-xl shadow-lg transition-colors cursor-pointer text-center mt-3"
              >
                Onboard Employee Member
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
