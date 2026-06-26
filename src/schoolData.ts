/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, Transaction, BusRoute, Staff, AttendanceRecord } from './types';

export const SCHOOL_INFO = {
  name: "EURO CHILDREN ACADEMY SR. SEC. SCHOOL",
  shortName: "ECA Barrod",
  address: "Barrod, Behror, Alwar, Rajasthan - 301020",
  phones: ["+91 9887053997", "+91 7424881274"],
  email: "eurochildrenacademy@gmail.com",
  tagline: "Shaping Young Minds, Building Bright Futures",
  director: "Mr. Mahendra Saini",
  principal: "Mrs. Sunita Choudhary",
  established: "2011",
  session: "2026-27",
  affiliation: "RBSE Affiliated (English & Hindi Medium)"
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "STU-2601",
    name: "Aarav Sharma",
    class: "10-A",
    fatherName: "Rajesh Sharma",
    contact: "+91 9414012345",
    dob: "2011-04-12",
    gender: "Male",
    address: "Ward No. 5, Barrod, Alwar, Rajasthan",
    rollNo: "1001",
    status: "Active",
    admissionDate: "2016-07-01",
    feesTotal: 25000,
    feesPaid: 12500
  },
  {
    id: "STU-2602",
    name: "Priya Patel",
    class: "8-B",
    fatherName: "Vikram Patel",
    contact: "+91 9414054321",
    dob: "2013-08-22",
    gender: "Female",
    address: "Subhash Chowk, Behror, Alwar, Rajasthan",
    rollNo: "0812",
    status: "Active",
    admissionDate: "2018-07-02",
    feesTotal: 22000,
    feesPaid: 13800
  },
  {
    id: "STU-2603",
    name: "Rahul Verma",
    class: "12-Sci",
    fatherName: "Sanjay Verma",
    contact: "+91 9887011122",
    dob: "2009-01-15",
    gender: "Male",
    address: "Near Power House, Neemrana, Alwar, Rajasthan",
    rollNo: "1251",
    status: "Active",
    admissionDate: "2020-07-05",
    feesTotal: 30000,
    feesPaid: 15000
  },
  {
    id: "STU-2604",
    name: "Rohit Saini",
    class: "11-Sci",
    fatherName: "Mahendra Saini",
    contact: "+91 9887053997",
    dob: "2010-05-30",
    gender: "Male",
    address: "Director Residence, Barrod, Rajasthan",
    rollNo: "1102",
    status: "Active",
    admissionDate: "2015-07-01",
    feesTotal: 28000,
    feesPaid: 28000
  },
  {
    id: "STU-2605",
    name: "Anjali Yadav",
    class: "9-A",
    fatherName: "Dharampal Yadav",
    contact: "+91 7424881274",
    dob: "2012-11-04",
    gender: "Female",
    address: "VPO Jakhrana, Behror, Rajasthan",
    rollNo: "0905",
    status: "Active",
    admissionDate: "2017-07-15",
    feesTotal: 24000,
    feesPaid: 12000
  },
  {
    id: "STU-2606",
    name: "Vikram Singh",
    class: "12-Sci",
    fatherName: "Sartaj Singh",
    contact: "+91 9982003344",
    dob: "2008-09-18",
    gender: "Male",
    address: "VPO Bardod, Tehsil Behror, Rajasthan",
    rollNo: "1252",
    status: "Active",
    admissionDate: "2024-07-10",
    feesTotal: 30000,
    feesPaid: 30000
  },
  {
    id: "STU-2607",
    name: "Neha Sharma",
    class: "11-Arts",
    fatherName: "Shanti Prasad Sharma",
    contact: "+91 9116044556",
    dob: "2010-02-14",
    gender: "Female",
    address: "Ward No. 10, Behror, Rajasthan",
    rollNo: "1172",
    status: "Active",
    admissionDate: "2025-07-02",
    feesTotal: 26000,
    feesPaid: 8000
  },
  {
    id: "STU-2608",
    name: "Harsh Vardhan",
    class: "10-A",
    fatherName: "Narendra Kumar",
    contact: "+91 9001055667",
    dob: "2011-12-25",
    gender: "Male",
    address: "VPO Sodawas, Alwar, Rajasthan",
    rollNo: "1002",
    status: "Active",
    admissionDate: "2016-07-05",
    feesTotal: 25000,
    feesPaid: 25000
  },
  {
    id: "STU-2609",
    name: "Komal Saini",
    class: "LKG",
    fatherName: "Satish Saini",
    contact: "+91 9660505050",
    dob: "2022-03-10",
    gender: "Female",
    address: "Barrod Bypass, Alwar, Rajasthan",
    rollNo: "0045",
    status: "Active",
    admissionDate: "2025-07-01",
    feesTotal: 15000,
    feesPaid: 7500
  },
  {
    id: "STU-2610",
    name: "Divyansh Yadav",
    class: "UKG",
    fatherName: "Karan Singh Yadav",
    contact: "+91 9812030405",
    dob: "2021-06-19",
    gender: "Male",
    address: "Main Bazar, Barrod, Rajasthan",
    rollNo: "0088",
    status: "Active",
    admissionDate: "2025-07-01",
    feesTotal: 15000,
    feesPaid: 10000
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TRX-26001', studentName: 'Aarav Sharma', class: '10-A', amount: '₹12,500', status: 'Paid', date: '2026-06-25', type: 'Tuition', receiptNo: 'REC-5512' },
  { id: 'TRX-26002', studentName: 'Priya Patel', class: '8-B', amount: '₹8,200', status: 'Pending', date: '2026-06-25', type: 'Tuition', receiptNo: 'REC-5513' },
  { id: 'TRX-26003', studentName: 'Rahul Verma', class: '12-Sci', amount: '₹15,000', status: 'Paid', date: '2026-06-24', type: 'Tuition', receiptNo: 'REC-5491' },
  { id: 'TRX-26004', studentName: 'Neha Sharma', class: '11-Arts', amount: '₹8,000', status: 'Paid', date: '2026-06-22', type: 'Admission', receiptNo: 'REC-5412' },
  { id: 'TRX-26005', studentName: 'Divyansh Yadav', class: 'UKG', amount: '₹10,000', status: 'Paid', date: '2026-06-18', type: 'Tuition', receiptNo: 'REC-5389' },
  { id: 'TRX-26006', studentName: 'Anjali Yadav', class: '9-A', amount: '₹12,000', status: 'Pending', date: '2026-06-15', type: 'Tuition', receiptNo: 'REC-5301' }
];

export const INITIAL_BUS_ROUTES: BusRoute[] = [
  { 
    id: 'BUS-01', 
    route: 'Route 1 - Behror City to Barrod', 
    driver: 'Ramesh Singh (+91 9414099991)', 
    status: 'On Time', 
    speed: '45 km/h', 
    color: 'text-green-500',
    stops: ['Behror Bus Stand', 'Sodawas Crossing', 'Jakhrana Mod', 'ECA Barrod'],
    currentStop: 'Sodawas Crossing'
  },
  { 
    id: 'BUS-02', 
    route: 'Route 2 - Behror Industrial Area', 
    driver: 'Suresh Kumar (+91 9414099992)', 
    status: 'Delayed (5m)', 
    speed: '20 km/h', 
    color: 'text-amber-500',
    stops: ['RIICO Phase I', 'RIICO Phase II', 'Gokalpura', 'ECA Barrod'],
    currentStop: 'RIICO Phase II'
  },
  { 
    id: 'BUS-03', 
    route: 'Route 3 - Neemrana NH-48', 
    driver: 'Vikram Yadav (+91 9414099993)', 
    status: 'On Time', 
    speed: '55 km/h', 
    color: 'text-green-500',
    stops: ['Neemrana Japanese Zone', 'Shahjahanpur Border', 'Bardod Chowk', 'ECA Barrod'],
    currentStop: 'Bardod Chowk'
  },
  { 
    id: 'BUS-04', 
    route: 'Route 4 - Barrod Local Villages', 
    driver: 'Om Prakash (+91 9414099994)', 
    status: 'Completed', 
    speed: '0 km/h', 
    color: 'text-gray-400',
    stops: ['Gunta Road', 'Khadgwan', 'Mandha Village', 'ECA Barrod'],
    currentStop: 'ECA Barrod'
  }
];

export const INITIAL_STAFF: Staff[] = [
  {
    id: "STF-101",
    name: "Mr. Mahendra Saini",
    designation: "Director & Patron",
    department: "Administration",
    contact: "+91 9887053997",
    email: "mahendrasaini@eca.edu.in",
    joiningDate: "2011-04-01",
    salary: "₹1,20,000",
    status: "Active"
  },
  {
    id: "STF-102",
    name: "Mrs. Sunita Choudhary",
    designation: "Principal",
    department: "Academic",
    contact: "+91 9414011223",
    email: "principal@eca.edu.in",
    joiningDate: "2014-06-15",
    salary: "₹75,000",
    status: "Active"
  },
  {
    id: "STF-103",
    name: "Mr. Rajesh Yadav",
    designation: "HOD Physics / PGT Teacher",
    department: "Academic",
    contact: "+91 9887044455",
    email: "rajesh.physics@eca.edu.in",
    joiningDate: "2016-07-10",
    salary: "₹45,000",
    status: "Active"
  },
  {
    id: "STF-104",
    name: "Mrs. Kiran Saini",
    designation: "Primary Coordinator & TGT English",
    department: "Academic",
    contact: "+91 7424881274",
    email: "kiran.english@eca.edu.in",
    joiningDate: "2015-08-01",
    salary: "₹38,000",
    status: "Active"
  },
  {
    id: "STF-105",
    name: "Mr. Anil Kumar",
    designation: "Senior Accountant & Admin Lead",
    department: "Administration",
    contact: "+91 9922114433",
    email: "accounts@eca.edu.in",
    joiningDate: "2012-05-12",
    salary: "₹42,000",
    status: "Active"
  },
  {
    id: "STF-106",
    name: "Mr. Sandeep Jangid",
    designation: "IT & Computer Labs Incharge",
    department: "Academic",
    contact: "+91 8899001122",
    email: "sandeep.cs@eca.edu.in",
    joiningDate: "2019-10-15",
    salary: "₹32,000",
    status: "Active"
  },
  {
    id: "STF-107",
    name: "Mr. Ramesh Singh",
    designation: "Senior Bus Driver (Route 1)",
    department: "Transport",
    contact: "+91 9414099991",
    email: "ramesh.driver@eca.edu.in",
    joiningDate: "2018-07-01",
    salary: "₹18,000",
    status: "Active"
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  { studentId: "STU-2601", studentName: "Aarav Sharma", class: "10-A", rollNo: "1001", status: "Present" },
  { studentId: "STU-2602", studentName: "Priya Patel", class: "8-B", rollNo: "0812", status: "Present" },
  { studentId: "STU-2603", studentName: "Rahul Verma", class: "12-Sci", rollNo: "1251", status: "Absent" },
  { studentId: "STU-2604", studentName: "Rohit Saini", class: "11-Sci", rollNo: "1102", status: "Present" },
  { studentId: "STU-2605", studentName: "Anjali Yadav", class: "9-A", rollNo: "0905", status: "Late" },
  { studentId: "STU-2606", studentName: "Vikram Singh", class: "12-Sci", rollNo: "1252", status: "Present" },
  { studentId: "STU-2607", studentName: "Neha Sharma", class: "11-Arts", rollNo: "1172", status: "Present" },
  { studentId: "STU-2608", studentName: "Harsh Vardhan", class: "10-A", rollNo: "1002", status: "Present" }
];
