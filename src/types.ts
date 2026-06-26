/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: string;
  name: string;
  class: string;
  fatherName: string;
  contact: string;
  dob: string;
  gender: string;
  address: string;
  rollNo: string;
  status: 'Active' | 'Inactive';
  admissionDate: string;
  feesPaid: number;
  feesTotal: number;
}

export interface Transaction {
  id: string;
  studentName: string;
  class: string;
  amount: string;
  status: 'Paid' | 'Pending';
  date: string;
  type: 'Tuition' | 'Admission' | 'Transport' | 'Library' | 'Exam';
  receiptNo: string;
}

export interface BusRoute {
  id: string;
  route: string;
  driver: string;
  status: 'On Time' | 'Delayed (5m)' | 'Delayed (15m)' | 'Completed' | 'Inactive';
  speed: string;
  color: string;
  stops: string[];
  currentStop: string;
}

export interface Staff {
  id: string;
  name: string;
  designation: string;
  department: 'Academic' | 'Administration' | 'Support' | 'Transport';
  contact: string;
  email: string;
  joiningDate: string;
  salary: string;
  status: 'Active' | 'On Leave';
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  class: string;
  rollNo: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
}
