/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Student, Transaction, BusRoute, Staff, AttendanceRecord } from '../types';
import { SCHOOL_INFO } from '../schoolData';

export function downloadHTMLFile(htmlContent: string, fileName: string) {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateSchoolReportHTML(
  students: Student[],
  transactions: Transaction[],
  staffList: Staff[],
  busRoutes: BusRoute[],
  attendanceRecords: AttendanceRecord[]
): string {
  // Calculate analytics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const totalStaff = staffList.length;
  const totalFeesExpected = students.reduce((acc, s) => acc + s.feesTotal, 0);
  const totalFeesPaid = students.reduce((acc, s) => acc + s.feesPaid, 0);
  const collectionRate = totalFeesExpected > 0 ? ((totalFeesPaid / totalFeesExpected) * 100).toFixed(1) : '0.0';
  const outstandingFees = totalFeesExpected - totalFeesPaid;

  // JSON safe serialization for passing database to the offline HTML
  const studentsJSON = JSON.stringify(students);
  const transactionsJSON = JSON.stringify(transactions);
  const staffJSON = JSON.stringify(staffList);
  const routesJSON = JSON.stringify(busRoutes);

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${SCHOOL_INFO.name} - ERP Offline Report</title>
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <!-- Lucide Icons (via devicon or unpkg) -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          colors: {
            brand: {
              950: '#0b1329',
              900: '#1c2541',
              800: '#3a506b',
              500: '#5bc0be',
              100: '#e0f2f1'
            }
          }
        }
      }
    }
  </script>
  <style>
    /* Custom premium styling */
    body {
      font-family: 'Inter', sans-serif;
      background-color: #f8fafc;
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 9999px;
    }
  </style>
</head>
<body class="text-slate-800 antialiased min-h-screen flex flex-col">

  <!-- Header Banner -->
  <header class="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white shadow-xl">
    <div class="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div>
        <div class="flex items-center gap-3">
          <div class="bg-amber-500 text-brand-950 p-2.5 rounded-2xl font-black text-xl shadow-lg shadow-amber-500/10">
            ECA
          </div>
          <div>
            <h1 class="text-xl md:text-2xl font-black tracking-tight">${SCHOOL_INFO.name}</h1>
            <p class="text-xs text-amber-400 font-bold uppercase tracking-wider mt-0.5">${SCHOOL_INFO.affiliation} • Session: ${SCHOOL_INFO.session}</p>
          </div>
        </div>
        <p class="text-xs text-slate-300 mt-2.5 max-w-xl"><i data-lucide="map-pin" class="inline h-3 w-3 mr-1 text-amber-400"></i>${SCHOOL_INFO.address}</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div class="bg-white/10 border border-white/10 p-3 rounded-2xl text-center min-w-[140px]">
          <span class="text-[10px] text-slate-300 font-bold block uppercase tracking-wider">Report Generated</span>
          <span class="text-sm font-black text-white mt-1 block" id="current-date-el">June 26, 2026</span>
        </div>
        <div class="bg-amber-500 text-brand-950 p-3 rounded-2xl text-center min-w-[140px]">
          <span class="text-[10px] text-brand-950/75 font-black block uppercase tracking-wider">Database Mode</span>
          <span class="text-sm font-extrabold mt-1 block">Standalone HTML</span>
        </div>
      </div>
    </div>
  </header>

  <!-- Navigation Rail -->
  <nav class="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between overflow-x-auto">
      <div class="flex gap-1 py-1">
        <button onclick="switchTab('dashboard')" id="tab-btn-dashboard" class="px-5 py-4 font-bold text-xs sm:text-sm border-b-2 border-amber-500 text-amber-600 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="layout-dashboard" class="h-4 w-4"></i> Dashboard
        </button>
        <button onclick="switchTab('students')" id="tab-btn-students" class="px-5 py-4 font-bold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="users" class="h-4 w-4"></i> Student Directory
        </button>
        <button onclick="switchTab('staff')" id="tab-btn-staff" class="px-5 py-4 font-bold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="briefcase" class="h-4 w-4"></i> Staff Register
        </button>
        <button onclick="switchTab('transactions')" id="tab-btn-transactions" class="px-5 py-4 font-bold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-all cursor-pointer">
          <i data-lucide="receipt" class="h-4 w-4"></i> Transaction Ledger
        </button>
      </div>

      <div class="text-xs text-slate-400 font-bold hidden md:block">
        Offline Archive Package
      </div>
    </div>
  </nav>

  <!-- Main Workspace Area -->
  <main class="flex-grow max-w-7xl w-full mx-auto p-6 space-y-8">

    <!-- SEARCH STRIP (Except dashboard tab) -->
    <div id="search-container" class="hidden bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div class="relative w-full sm:max-w-md">
        <i data-lucide="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-4.5 w-4.5"></i>
        <input type="text" id="global-search" oninput="handleSearch()" placeholder="Search dynamic fields..." class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all">
      </div>
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <span class="text-xs text-slate-400 font-bold whitespace-nowrap">Filter Match:</span>
        <select id="class-filter" onchange="handleSearch()" class="p-2 text-xs font-bold rounded-xl bg-slate-100 border-none outline-none text-slate-700 cursor-pointer">
          <option value="All">All Standard Classes</option>
        </select>
      </div>
    </div>

    <!-- ================= DASHBOARD TAB ================= -->
    <section id="tab-dashboard" class="space-y-8">
      
      <!-- Quick KPIs -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Enrolled Students</span>
            <h3 class="text-2xl font-black text-slate-900 mt-1">${totalStudents}</h3>
            <span class="text-[10px] text-green-600 font-bold mt-1 block"><i data-lucide="check" class="inline h-3 w-3 mr-0.5"></i>${activeStudents} Active</span>
          </div>
          <div class="bg-blue-50 text-blue-900 p-3.5 rounded-2xl">
            <i data-lucide="users" class="h-6 w-6"></i>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Registered Faculty</span>
            <h3 class="text-2xl font-black text-slate-900 mt-1">${totalStaff}</h3>
            <span class="text-[10px] text-slate-400 font-medium mt-1 block">Full academic staff</span>
          </div>
          <div class="bg-indigo-50 text-indigo-900 p-3.5 rounded-2xl">
            <i data-lucide="briefcase" class="h-6 w-6"></i>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Fees Collected</span>
            <h3 class="text-2xl font-black text-green-700 mt-1">₹${totalFeesPaid.toLocaleString()}</h3>
            <span class="text-[10px] text-slate-400 font-medium mt-1 block">${collectionRate}% collection rate</span>
          </div>
          <div class="bg-green-50 text-green-700 p-3.5 rounded-2xl">
            <i data-lucide="check-circle" class="h-6 w-6"></i>
          </div>
        </div>

        <div class="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Outstanding Dues</span>
            <h3 class="text-2xl font-black text-amber-600 mt-1">₹${outstandingFees.toLocaleString()}</h3>
            <span class="text-[10px] text-amber-500 font-bold mt-1 block">Dues Remaining</span>
          </div>
          <div class="bg-amber-50 text-amber-600 p-3.5 rounded-2xl">
            <i data-lucide="alert-triangle" class="h-6 w-6"></i>
          </div>
        </div>
      </div>

      <!-- Charts & Quick Insights -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Interactive Chart -->
        <div class="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-900 text-sm tracking-wide">Interactive Analytics overview</h4>
          <p class="text-xs text-slate-400">Visualization of School Dues Collections Ratio</p>
          <div class="relative h-[280px]">
            <canvas id="feesChart"></canvas>
          </div>
        </div>

        <!-- School Information Sheet -->
        <div class="lg:col-span-4 bg-brand-950 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div class="space-y-4">
            <h4 class="font-black text-amber-400 text-sm tracking-wider uppercase">Institutional Directory</h4>
            <div class="space-y-3.5 text-xs text-slate-300">
              <div class="flex justify-between border-b border-white/5 pb-2">
                <span>Director</span>
                <span class="font-bold text-white">${SCHOOL_INFO.director}</span>
              </div>
              <div class="flex justify-between border-b border-white/5 pb-2">
                <span>Principal</span>
                <span class="font-bold text-white">${SCHOOL_INFO.principal}</span>
              </div>
              <div class="flex justify-between border-b border-white/5 pb-2">
                <span>Est. Year</span>
                <span class="font-bold text-white">${SCHOOL_INFO.established}</span>
              </div>
              <div class="flex justify-between border-b border-white/5 pb-2">
                <span>Affiliation No</span>
                <span class="font-bold text-white">RBSE / 885</span>
              </div>
              <div class="flex justify-between">
                <span>Active Session</span>
                <span class="font-bold text-amber-400">${SCHOOL_INFO.session}</span>
              </div>
            </div>
          </div>

          <div class="border-t border-white/10 pt-4 mt-6">
            <p class="text-[10px] text-slate-400 uppercase font-black tracking-wider">Official Contacts</p>
            <p class="text-xs text-white font-bold mt-1.5">${SCHOOL_INFO.phones.join('  •  ')}</p>
            <p class="text-[10px] text-slate-300 font-mono mt-1">${SCHOOL_INFO.email}</p>
          </div>
        </div>

      </div>

    </section>

    <!-- ================= STUDENTS TAB ================= -->
    <section id="tab-students" class="hidden space-y-6">
      <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 class="font-black text-brand-950 text-base">Archived Students Registry</h3>
          <span class="text-xs text-slate-400 font-bold"><span id="students-match-count">0</span> matching entries</span>
        </div>

        <div class="overflow-x-auto text-sm text-left custom-scrollbar">
          <table class="w-full border-collapse">
            <thead>
              <tr class="text-slate-400 font-bold bg-slate-50 border-b border-slate-100">
                <th class="p-4">Roll No</th>
                <th className="p-4" style="padding: 1rem;">Student Name</th>
                <th className="p-4" style="padding: 1rem;">Parent Profile</th>
                <th className="p-4" style="padding: 1rem;">Standard</th>
                <th className="p-4" style="padding: 1rem;">Contact No</th>
                <th className="p-4" style="padding: 1rem;">Dues Collected</th>
                <th className="p-4" style="padding: 1rem;">Clearance Status</th>
              </tr>
            </thead>
            <tbody id="students-table-body">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= STAFF TAB ================= -->
    <section id="tab-staff" class="hidden space-y-6">
      <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 class="font-black text-brand-950 text-base">Onboarded Educator Registry</h3>
          <span class="text-xs text-slate-400 font-bold"><span id="staff-match-count">0</span> matching employees</span>
        </div>

        <div class="overflow-x-auto text-sm text-left custom-scrollbar">
          <table class="w-full border-collapse">
            <thead>
              <tr class="text-slate-400 font-bold bg-slate-50 border-b border-slate-100">
                <th class="p-4">Staff ID</th>
                <th className="p-4" style="padding: 1rem;">Employee Name</th>
                <th className="p-4" style="padding: 1rem;">Academic Department</th>
                <th className="p-4" style="padding: 1rem;">Designation Role</th>
                <th className="p-4" style="padding: 1rem;">Salary Slip</th>
                <th className="p-4" style="padding: 1rem;">Joining Date</th>
                <th className="p-4" style="padding: 1rem;">Status</th>
              </tr>
            </thead>
            <tbody id="staff-table-body">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================= TRANSACTIONS TAB ================= -->
    <section id="tab-transactions" class="hidden space-y-6">
      <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
          <h3 class="font-black text-brand-950 text-base">Receipt Audit & Transaction Ledger</h3>
          <span class="text-xs text-slate-400 font-bold"><span id="transactions-match-count">0</span> records audited</span>
        </div>

        <div class="overflow-x-auto text-sm text-left custom-scrollbar">
          <table class="w-full border-collapse">
            <thead>
              <tr class="text-slate-400 font-bold bg-slate-50 border-b border-slate-100">
                <th class="p-4">Receipt No</th>
                <th className="p-4" style="padding: 1rem;">Student</th>
                <th className="p-4" style="padding: 1rem;">Category</th>
                <th className="p-4" style="padding: 1rem;">Amount (₹)</th>
                <th className="p-4" style="padding: 1rem;">Date</th>
                <th className="p-4" style="padding: 1rem;">Audit Status</th>
              </tr>
            </thead>
            <tbody id="transactions-table-body">
              <!-- Rendered via JS -->
            </tbody>
          </table>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer Info -->
  <footer class="bg-slate-900 border-t border-slate-800 text-slate-400 py-10 px-6 text-center text-xs space-y-3 mt-auto">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <p>© 2026 ${SCHOOL_INFO.name}. Standalone Snapshot Backup Document.</p>
      <div class="flex gap-4">
        <span class="hover:text-white transition-colors">Affiliated to RBSE Alwar</span>
        <span>•</span>
        <span class="hover:text-white transition-colors">Digital System Snapshot v1.0</span>
      </div>
    </div>
  </footer>

  <!-- DATABASE INJECTION -->
  <script>
    const studentsData = ${studentsJSON};
    const transactionsData = ${transactionsJSON};
    const staffData = ${staffJSON};
    const routesData = ${routesJSON};

    let activeTab = 'dashboard';

    // Set Date in UI
    document.getElementById('current-date-el').innerText = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Extract unique classes to load in dropdown
    const classDropdown = document.getElementById('class-filter');
    const classesSet = new Set(studentsData.map(s => s.class));
    classesSet.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.innerText = "Standard " + c;
      classDropdown.appendChild(opt);
    });

    // Tab Switching Routing
    function switchTab(tabId) {
      activeTab = tabId;
      
      // Toggle CSS selectors
      ['dashboard', 'students', 'staff', 'transactions'].forEach(id => {
        const tabEl = document.getElementById('tab-' + id);
        const btnEl = document.getElementById('tab-btn-' + id);
        if (id === tabId) {
          tabEl.classList.remove('hidden');
          btnEl.className = "px-5 py-4 font-bold text-xs sm:text-sm border-b-2 border-amber-500 text-amber-600 flex items-center gap-2 transition-all cursor-pointer";
        } else {
          tabEl.classList.add('hidden');
          btnEl.className = "px-5 py-4 font-bold text-xs sm:text-sm border-b-2 border-transparent text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-all cursor-pointer";
        }
      });

      // Show/Hide search bar
      const searchContainer = document.getElementById('search-container');
      if (tabId === 'dashboard') {
        searchContainer.classList.add('hidden');
      } else {
        searchContainer.classList.remove('hidden');
        // Reset inputs
        document.getElementById('global-search').value = '';
        document.getElementById('class-filter').value = 'All';
        renderTables();
      }
    }

    // Render Dynamic Tables
    function renderTables() {
      const query = document.getElementById('global-search').value.toLowerCase();
      const targetClass = document.getElementById('class-filter').value;

      // 1. Students Registry
      if (activeTab === 'students') {
        const tableBody = document.getElementById('students-table-body');
        tableBody.innerHTML = '';
        const filtered = studentsData.filter(s => {
          const matchesQuery = s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query) || s.fatherName.toLowerCase().includes(query);
          const matchesClass = targetClass === 'All' || s.class === targetClass;
          return matchesQuery && matchesClass;
        });

        document.getElementById('students-match-count').innerText = filtered.length;

        filtered.forEach(s => {
          const outstanding = s.feesTotal - s.feesPaid;
          const isPaid = outstanding <= 0;
          const rowHtml = \`
            <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td class="p-4 font-mono font-bold text-slate-400">\${s.rollNo}</td>
              <td class="p-4 font-bold text-slate-900">\${s.name} <span class="text-[9px] text-slate-400 font-normal block">ID: \${s.id}</span></td>
              <td class="p-4 text-slate-600 font-semibold">\${s.fatherName}</td>
              <td class="p-4 text-slate-700 font-bold">\${s.class}</td>
              <td class="p-4 text-slate-600 font-mono">\${s.contact}</td>
              <td class="p-4"><span class="font-bold text-green-700">₹\${s.feesPaid.toLocaleString()}</span> <span class="text-[10px] text-slate-400 block mt-0.5">Total: ₹\${s.feesTotal.toLocaleString()}</span></td>
              <td class="p-4">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold \${isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">
                  \${isPaid ? 'Fully Cleared' : 'Pending Dues'}
                </span>
              </td>
            </tr>
          \`;
          tableBody.insertAdjacentHTML('beforeend', rowHtml);
        });

        if (filtered.length === 0) {
          tableBody.innerHTML = \`<tr><td colSpan="7" class="py-12 text-center text-slate-400 font-bold">No students match your criteria.</td></tr>\`;
        }
      }

      // 2. Staff Register
      if (activeTab === 'staff') {
        const tableBody = document.getElementById('staff-table-body');
        tableBody.innerHTML = '';
        const filtered = staffData.filter(s => {
          const matchesQuery = s.name.toLowerCase().includes(query) || s.designation.toLowerCase().includes(query) || s.id.toLowerCase().includes(query);
          return matchesQuery;
        });

        document.getElementById('staff-match-count').innerText = filtered.length;

        filtered.forEach(s => {
          const rowHtml = \`
            <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td class="p-4 font-mono font-bold text-slate-400">\${s.id}</td>
              <td class="p-4 font-bold text-slate-900">\${s.name} <span class="text-[9px] text-slate-400 block">\${s.email}</span></td>
              <td class="p-4 text-slate-700 font-semibold">\${s.department}</td>
              <td class="p-4 text-slate-600 font-bold uppercase tracking-wider text-[11px]">\${s.designation}</td>
              <td class="p-4 text-slate-800 font-bold">\${s.salary}</td>
              <td class="p-4 text-slate-500 font-mono text-xs">\${s.joiningDate}</td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold \${s.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                  \${s.status}
                </span>
              </td>
            </tr>
          \`;
          tableBody.insertAdjacentHTML('beforeend', rowHtml);
        });

        if (filtered.length === 0) {
          tableBody.innerHTML = \`<tr><td colSpan="7" class="py-12 text-center text-slate-400 font-bold">No staff members match your criteria.</td></tr>\`;
        }
      }

      // 3. Transactions Audit
      if (activeTab === 'transactions') {
        const tableBody = document.getElementById('transactions-table-body');
        tableBody.innerHTML = '';
        const filtered = transactionsData.filter(t => {
          const matchesQuery = t.studentName.toLowerCase().includes(query) || t.receiptNo.toLowerCase().includes(query);
          const matchesClass = targetClass === 'All' || t.class === targetClass;
          return matchesQuery && matchesClass;
        });

        document.getElementById('transactions-match-count').innerText = filtered.length;

        filtered.forEach(t => {
          const rowHtml = \`
            <tr class="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
              <td class="p-4 font-mono font-bold text-brand-950">\${t.receiptNo}</td>
              <td class="p-4 font-bold text-slate-900">\${t.studentName} <span class="text-[10px] text-slate-400 block">Class: \${t.class}</span></td>
              <td class="p-4 text-slate-600 font-semibold">\${t.type}</td>
              <td class="p-4 text-slate-900 font-bold">\${t.amount}</td>
              <td class="p-4 text-slate-500 font-mono text-xs">\${t.date}</td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">
                  \${t.status}
                </span>
              </td>
            </tr>
          \`;
          tableBody.insertAdjacentHTML('beforeend', rowHtml);
        });

        if (filtered.length === 0) {
          tableBody.innerHTML = \`<tr><td colSpan="6" class="py-12 text-center text-slate-400 font-bold">No transactions match your criteria.</td></tr>\`;
        }
      }
    }

    function handleSearch() {
      renderTables();
    }

    // Chart.js Setup
    document.addEventListener("DOMContentLoaded", function() {
      // Setup icons
      lucide.createIcons();

      const ctx = document.getElementById('feesChart').getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Collected Fees (₹)', 'Remaining Dues (₹)'],
          datasets: [{
            data: [\${totalFeesPaid}, \${outstandingFees}],
            backgroundColor: ['#22c55e', '#f59e0b'],
            borderWidth: 2,
            borderColor: '#ffffff',
            hoverOffset: 12
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                font: {
                  family: 'Inter',
                  weight: '600',
                  size: 11
                },
                color: '#475569'
              }
            }
          },
          cutout: '70%'
        }
      });
    });
  </script>
</body>
</html>`;
}
