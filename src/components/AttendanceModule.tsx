/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle, Search, Save, Calendar, Check, X, AlertCircle, Clock } from 'lucide-react';
import { Student, AttendanceRecord } from '../types';

interface AttendanceModuleProps {
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  onUpdateAttendance: (records: AttendanceRecord[]) => void;
  userRole: 'admin' | 'teacher' | 'parent';
}

export default function AttendanceModule({
  students,
  attendanceRecords,
  onUpdateAttendance,
  userRole
}: AttendanceModuleProps) {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSaved, setIsSaved] = useState(false);

  // Local copy of attendance for interactive toggles before saving
  const [localAttendance, setLocalAttendance] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Leave'>>(() => {
    const initial: Record<string, 'Present' | 'Absent' | 'Late' | 'Leave'> = {};
    attendanceRecords.forEach(r => {
      initial[r.studentId] = r.status;
    });
    // Add missing students as "Present" by default
    students.forEach(s => {
      if (!initial[s.id]) {
        initial[s.id] = 'Present';
      }
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setLocalAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
    setIsSaved(false);
  };

  const handleSaveAll = () => {
    const updatedRecords: AttendanceRecord[] = classStudents.map(student => ({
      studentId: student.id,
      studentName: student.name,
      class: student.class,
      rollNo: student.rollNo,
      status: localAttendance[student.id] || 'Present'
    }));

    onUpdateAttendance(updatedRecords);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 4000);
  };

  const classStudents = students.filter(s => s.class === selectedClass);
  const uniqueClasses = Array.from(new Set(students.map(s => s.class)));

  // Calculate percentages
  const classPresentCount = classStudents.filter(s => (localAttendance[s.id] || 'Present') === 'Present').length;
  const classLateCount = classStudents.filter(s => (localAttendance[s.id] || 'Present') === 'Late').length;
  const classAbsentCount = classStudents.filter(s => (localAttendance[s.id] || 'Present') === 'Absent').length;
  const classRatio = classStudents.length > 0 
    ? (((classPresentCount + classLateCount) / classStudents.length) * 100).toFixed(0) 
    : '100';

  // If role is parent, show static history card for Aarav Sharma
  if (userRole === 'parent') {
    return (
      <div className="space-y-6 font-sans">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-extrabold text-blue-950 text-base">Student Monthly Attendance History</h3>
              <p className="text-xs text-gray-400 mt-1">Ward Profile: Aarav Sharma (Class 10-A)</p>
            </div>
            <span className="bg-green-100 text-green-700 font-bold px-3 py-1 text-xs rounded-full">
              Overall Status: Excellent
            </span>
          </div>

          {/* Stats visual */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Classes Attended', val: '18 Days', color: 'text-green-700 bg-green-50' },
              { label: 'Unexcused Absences', val: '1 Day', color: 'text-red-700 bg-red-50' },
              { label: 'Excused Leave', val: '1 Day', color: 'text-blue-700 bg-blue-50' },
              { label: 'Late Entries', val: '2 Days', color: 'text-amber-700 bg-amber-50' }
            ].map((st, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border border-transparent ${st.color} text-center`}>
                <span className="text-[10px] text-gray-500 font-bold block uppercase">{st.label}</span>
                <span className="text-lg font-black block mt-1">{st.val}</span>
              </div>
            ))}
          </div>

          {/* Table history */}
          <div className="overflow-x-auto text-sm text-left pt-2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-gray-400 font-bold border-b border-gray-100">
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Academic Standard</th>
                  <th className="pb-3">Reporting Time</th>
                  <th className="pb-3">Status Marked</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2026-06-25", class: "10-A", time: "08:02 AM", status: "Present", color: "text-green-700 bg-green-100" },
                  { date: "2026-06-24", class: "10-A", time: "08:15 AM", status: "Late", color: "text-amber-700 bg-amber-100" },
                  { date: "2026-06-23", class: "10-A", time: "07:55 AM", status: "Present", color: "text-green-700 bg-green-100" },
                  { date: "2026-06-22", class: "10-A", time: "---", status: "Absent", color: "text-red-700 bg-red-100" },
                  { date: "2026-06-21", class: "10-A", time: "08:00 AM", status: "Present", color: "text-green-700 bg-green-100" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50/30">
                    <td className="py-3 font-semibold text-gray-700">{row.date}</td>
                    <td className="py-3 text-gray-500">{row.class}</td>
                    <td className="py-3 text-gray-600 font-mono">{row.time}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.color}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Configuration row */}
      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Class Select */}
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600">
            <span>Marking Standard Class:</span>
            <select 
              value={selectedClass}
              onChange={e => { setSelectedClass(e.target.value); setIsSaved(false); }}
              className="bg-transparent border-none outline-none font-extrabold text-blue-950 pr-4 cursor-pointer"
              id="attendance-class-select"
            >
              {uniqueClasses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Date Select */}
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input 
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="bg-transparent border-none outline-none font-extrabold text-blue-950 cursor-pointer"
              id="attendance-date-select"
            />
          </div>
        </div>

        {/* Save button */}
        {classStudents.length > 0 && (
          <button 
            onClick={handleSaveAll}
            className="w-full md:w-auto bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            id="attendance-save-btn"
          >
            <Save className="h-4.5 w-4.5" /> Save Attendance Tally
          </button>
        )}

      </div>

      {/* Success Banner */}
      {isSaved && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3.5 text-green-800 text-sm font-semibold animate-pulse">
          <Check className="h-5 w-5 bg-green-100 text-green-700 p-0.5 rounded-full" />
          <span>Attendance register successfully locked and archived for Class {selectedClass} on date {date}. (Attendance percentage: {classRatio}%)</span>
        </div>
      )}

      {/* Ratios strip */}
      {classStudents.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Class Ratio</span>
            <span className="text-xl font-black text-blue-950 block mt-1">{classRatio}% Present</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Present Count</span>
            <span className="text-xl font-black text-green-700 block mt-1">{classPresentCount} Students</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Late Arrivals</span>
            <span className="text-xl font-black text-amber-600 block mt-1">{classLateCount} Students</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Absentees</span>
            <span className="text-xl font-black text-red-500 block mt-1">{classAbsentCount} Students</span>
          </div>
        </div>
      )}

      {/* Attendance Sheet */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-extrabold text-blue-950 text-base">Classroom Attendance Grid</h3>
        </div>

        <div className="overflow-x-auto text-sm text-left">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-400 font-bold bg-slate-50 border-b border-gray-100">
                <th className="p-4">Roll No</th>
                <th className="p-4">Student Name</th>
                <th className="p-4 text-center">Status Control</th>
                <th className="p-4 text-right">Quick Quick Toggle</th>
              </tr>
            </thead>
            <tbody>
              {classStudents.map((student) => {
                const currentStatus = localAttendance[student.id] || 'Present';

                return (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-slate-50/30 transition-colors">
                    <td className="p-4 font-mono font-bold text-gray-400">{student.rollNo}</td>
                    <td className="p-4">
                      <div className="font-bold text-blue-950">{student.name}</div>
                      <span className="text-[10px] text-gray-400 font-bold block mt-0.5">ID: {student.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-1">
                        {(['Present', 'Absent', 'Late', 'Leave'] as const).map(st => {
                          const isCurrent = currentStatus === st;
                          const colorClasses = 
                            st === 'Present' ? (isCurrent ? 'bg-green-600 text-white' : 'hover:bg-green-50 text-green-600') :
                            st === 'Absent' ? (isCurrent ? 'bg-red-500 text-white' : 'hover:bg-red-50 text-red-500') :
                            st === 'Late' ? (isCurrent ? 'bg-amber-500 text-blue-950' : 'hover:bg-amber-50 text-amber-500') :
                            (isCurrent ? 'bg-blue-600 text-white' : 'hover:bg-blue-50 text-blue-600');

                          return (
                            <button
                              key={st}
                              onClick={() => handleStatusChange(student.id, st)}
                              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${colorClasses}`}
                              id={`attendance-status-${student.id}-${st}`}
                            >
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      {currentStatus === 'Present' ? (
                        <span className="text-[11px] font-bold text-green-700 flex items-center justify-end gap-1"><Check className="h-4 w-4" /> Cleared</span>
                      ) : (
                        <button 
                          onClick={() => handleStatusChange(student.id, 'Present')}
                          className="text-[10px] font-extrabold text-blue-950 bg-slate-100 hover:bg-yellow-500/10 hover:text-yellow-600 px-2.5 py-1 rounded-lg border cursor-pointer"
                        >
                          Reset to Present
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {classStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-400 font-semibold py-12">No student records are registered in Class {selectedClass}.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
