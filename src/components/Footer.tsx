/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';

interface FooterProps {
  setView: (view: string) => void;
}

export default function Footer({ setView }: FooterProps) {
  const scrollToSection = (id: string) => {
    setView('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-blue-950 text-blue-100 border-t border-blue-900/60 font-sans" id="footer-section">
      {/* Upper footer area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Info Col */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-yellow-500" />
            <h3 className="text-white text-xl font-extrabold tracking-tight">ECA Barrod</h3>
          </div>
          <p className="text-sm leading-relaxed text-blue-200">
            {SCHOOL_INFO.tagline}. Providing RBSE affiliation with premium academic guidance and robust character building.
          </p>
          <div className="pt-4 border-t border-blue-900/50 space-y-2">
            <p className="text-xs text-blue-300">
              Patron & Director: <span className="font-semibold text-white">{SCHOOL_INFO.director}</span>
            </p>
            <p className="text-xs text-blue-300">
              Principal: <span className="font-semibold text-white">{SCHOOL_INFO.principal}</span>
            </p>
            <p className="text-xs text-blue-300">
              Established: <span className="font-semibold text-white">{SCHOOL_INFO.established}</span>
            </p>
          </div>
        </div>

        {/* Contact Info Col */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-bold border-b border-blue-900 pb-2">Reach Us</h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
              <span className="text-blue-200 leading-relaxed">{SCHOOL_INFO.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <div className="text-blue-200">
                <p>{SCHOOL_INFO.phones[0]}</p>
                <p>{SCHOOL_INFO.phones[1]}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <span className="text-blue-200 break-all">{SCHOOL_INFO.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-yellow-500 flex-shrink-0" />
              <span className="text-blue-200">Office Hours: 8:00 AM - 2:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Quick Links Col */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-bold border-b border-blue-900 pb-2">School Portals</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button 
                onClick={() => setView('login')} 
                className="text-blue-200 hover:text-yellow-400 transition-colors text-left flex items-center gap-2 group"
                id="footer-student-portal"
              >
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-transform"></span>
                ERP Portal Access
              </button>
            </li>
            <li>
              <button 
                onClick={() => setView('admission')} 
                className="text-blue-200 hover:text-yellow-400 transition-colors text-left flex items-center gap-2 group"
                id="footer-online-admission"
              >
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-transform"></span>
                Apply for New Admission
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('facilities')} 
                className="text-blue-200 hover:text-yellow-400 transition-colors text-left flex items-center gap-2 group"
                id="footer-facilities"
              >
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-transform"></span>
                School Facilities
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('academics')} 
                className="text-blue-200 hover:text-yellow-400 transition-colors text-left flex items-center gap-2 group"
                id="footer-academics"
              >
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-transform"></span>
                Academic Calendar
              </button>
            </li>
            <li>
              <button 
                onClick={() => setView('login')} 
                className="text-blue-200 hover:text-yellow-400 transition-colors text-left flex items-center gap-2 group"
                id="footer-fees-payment"
              >
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full group-hover:scale-125 transition-transform"></span>
                Pay Tuition Fees ERP
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-blue-900/60 py-6 text-center text-xs text-blue-300 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} {SCHOOL_INFO.name}. All Rights Reserved.</p>
        <p className="flex items-center gap-1.5 text-[11px]">
          <Award className="h-3.5 w-3.5 text-yellow-500" />
          Affiliated with Rajasthan Board of Secondary Education (RBSE)
        </p>
      </div>
    </footer>
  );
}
