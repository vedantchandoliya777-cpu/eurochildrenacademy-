/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Users, Search, UserPlus, Filter, ShieldAlert, BadgeCheck, Phone, Check, Trash, Plus } from 'lucide-react';
import { Student } from '../types';

interface StudentsModuleProps {
  students: Student[];
  onToggleStatus: (id: string) => void;
  onAdmitStudent: (newStudent: Omit<Student, 'id' | 'rollNo' | 'status' | 'admissionDate' | 'feesPaid' | 'feesTotal'>) => void;
}

export default function StudentsModule({
  students,
  onToggleStatus,
  onAdmitStudent
}: StudentsModuleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('All');
  
  // Admit modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    dob: '',
    className: '10-A',
    gender: 'Male',
    fatherName: '',
    contact: '',
    address: ''
  });

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.fatherName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (classFilter === 'All') return matchesSearch;
    return matchesSearch && s.class === classFilter;
  });

  // Extract unique classes for filtering
  const uniqueClasses = ['All', ...Array.from(new Set(students.map(s => s.class)))];

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.name || !newStudentForm.fatherName || !newStudentForm.contact) {
      alert("Please fill in all required fields.");
      return;
    }

    onAdmitStudent({
      name: newStudentForm.name,
      dob: newStudentForm.dob || '2012-01-01',
      class: newStudentForm.className,
      gender: newStudentForm.gender,
      fatherName: newStudentForm.fatherName,
      contact: newStudentForm.contact,
      address: newStudentForm.address || 'Barrod Local, Behror'
    });

    setShowAddModal(false);
    setNewStudentForm({
      name: '',
      dob: '',
      className: '10-A',
      gender: 'Male',
      fatherName: '',
      contact: '',
      address: ''
    });
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Panel */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="h-4.5 w-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search student or father name..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-xs sm:text-sm focus:bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none" 
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600">
            <Filter className="h-4 w-4 text-gray-500" />
            <span>Filter Standard:</span>
            <select 
              value={classFilter}
              onChange={e => setClassFilter(e.target.value)}
              className="bg-transparent border-none outline-none font-extrabold text-blue-950 pr-4"
              id="student-class-filter"
            >
              {uniqueClasses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer ml-auto sm:ml-0"
            id="erp-add-student-btn"
          >
            <UserPlus className="h-4.5 w-4.5" /> Admission Form
          </button>
        </div>

      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div 
            key={student.id} 
            className="bg-white rounded-3xl border border-gray-100/80 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            id={`student-card-${student.id}`}
          >
            <span className="absolute top-0 right-0 bg-blue-50 text-blue-900 font-extrabold text-[10px] px-3.5 py-1.5 rounded-bl-2xl">
              Roll No: {student.rollNo}
            </span>

            <div className="flex items-start gap-4 mb-5">
              <div className="h-12 w-12 rounded-full bg-blue-100/60 text-blue-950 font-black text-sm flex items-center justify-center border border-blue-200">
                {student.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-base">{student.name}</h4>
                <p className="text-xs text-yellow-600 font-bold uppercase mt-0.5 tracking-wider">Std: {student.class} • {student.gender}</p>
                <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[9px] font-bold ${
                  student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {student.status === 'Active' ? <BadgeCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                  {student.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-4 text-xs font-semibold text-gray-600">
              <div className="flex justify-between">
                <span>Father's Name</span>
                <span className="text-gray-800">{student.fatherName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Phone Contact</span>
                <span className="text-blue-900 hover:underline flex items-center gap-1">
                  <Phone className="h-3 w-3" /> {student.contact}
                </span>
              </div>
              <div className="flex justify-between">
                <span>DOB</span>
                <span className="text-gray-800">{student.dob}</span>
              </div>
              <div className="flex justify-between">
                <span>Campus Residence</span>
                <span className="text-gray-800 truncate max-w-[180px]">{student.address}</span>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-bold">ERP ID: {student.id}</span>
              
              <button 
                onClick={() => onToggleStatus(student.id)}
                className={`px-3 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer ${
                  student.status === 'Active' 
                    ? 'text-red-500 hover:bg-red-50 border-red-200' 
                    : 'text-green-700 hover:bg-green-50 border-green-200'
                }`}
              >
                {student.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
        {filteredStudents.length === 0 && (
          <p className="col-span-full text-center text-gray-400 font-bold py-12">No student records match the search or filter standards.</p>
        )}
      </div>

      {/* Manual Admission Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-blue-950/45 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-gray-100 overflow-hidden relative">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer animate-pulse"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="bg-blue-950 p-6 text-white text-center">
              <Users className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
              <h4 className="font-extrabold text-lg">Direct Admission Intake</h4>
              <p className="text-xs text-blue-200 mt-1">Enroll a new student record manually into ECA ERP</p>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Full Student Name *</label>
                  <input 
                    type="text" 
                    required
                    value={newStudentForm.name}
                    onChange={e => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                    placeholder="Enter student name"
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Target Class *</label>
                  <select 
                    value={newStudentForm.className}
                    onChange={e => setNewStudentForm({ ...newStudentForm, className: e.target.value })}
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option>Nursery</option>
                    <option>LKG</option>
                    <option>UKG</option>
                    <option>Class 1</option>
                    <option>Class 5</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                    <option>10-A</option>
                    <option>8-B</option>
                    <option>11-Sci</option>
                    <option>11-Arts</option>
                    <option>12-Sci</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Gender *</label>
                  <select 
                    value={newStudentForm.gender}
                    onChange={e => setNewStudentForm({ ...newStudentForm, gender: e.target.value })}
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Father's Name *</label>
                  <input 
                    type="text" 
                    required
                    value={newStudentForm.fatherName}
                    onChange={e => setNewStudentForm({ ...newStudentForm, fatherName: e.target.value })}
                    placeholder="Father's full name"
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Contact Mobile *</label>
                  <input 
                    type="tel" 
                    required
                    value={newStudentForm.contact}
                    onChange={e => setNewStudentForm({ ...newStudentForm, contact: e.target.value })}
                    placeholder="10 digit number"
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Residential Address</label>
                  <input 
                    type="text" 
                    value={newStudentForm.address}
                    onChange={e => setNewStudentForm({ ...newStudentForm, address: e.target.value })}
                    placeholder="Residential address"
                    className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" 
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-sm rounded-xl shadow-lg transition-colors cursor-pointer text-center mt-3"
              >
                Intake & Enroll Student
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

const X = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
