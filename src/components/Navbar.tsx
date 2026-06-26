/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, Menu, X, Phone, Mail, Award, MapPin } from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';

interface NavbarProps {
  setView: (view: string) => void;
  activeView: string;
}

export default function Navbar({ setView, activeView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setView('home');
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const NavLinks = () => (
    <>
      <button 
        onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }} 
        className={`font-semibold hover:text-yellow-400 transition-colors text-left text-sm ${activeView === 'home' ? 'text-yellow-400 font-bold' : 'text-white'}`}
        id="nav-home"
      >
        Home
      </button>
      <button 
        onClick={() => scrollToSection('academics')} 
        className="font-semibold text-white hover:text-yellow-400 transition-colors text-left text-sm"
        id="nav-academics"
      >
        Academics
      </button>
      <button 
        onClick={() => { setView('admission'); setIsOpen(false); }} 
        className={`font-semibold hover:text-yellow-400 transition-colors text-left text-sm ${activeView === 'admission' ? 'text-yellow-400 font-bold' : 'text-white'}`}
        id="nav-admission"
      >
        Admissions
      </button>
      <button 
        onClick={() => scrollToSection('facilities')} 
        className="font-semibold text-white hover:text-yellow-400 transition-colors text-left text-sm"
        id="nav-facilities"
      >
        Facilities
      </button>
      <button 
        onClick={() => scrollToSection('contact')} 
        className="font-semibold text-white hover:text-yellow-400 transition-colors text-left text-sm"
        id="nav-contact"
      >
        Contact
      </button>
      <button 
        onClick={() => { setView('login'); setIsOpen(false); }} 
        className="bg-yellow-500 text-blue-950 px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-yellow-400 hover:shadow-yellow-500/20 transition-all duration-300 transform hover:scale-105 text-sm inline-flex items-center justify-center gap-2"
        id="nav-erp-login"
      >
        ERP Login
      </button>
    </>
  );

  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-blue-950/95 backdrop-blur-md text-white shadow-lg border-b border-blue-900">
      {/* Top Bar */}
      <div className="bg-blue-950 py-1.5 border-b border-blue-900/60 hidden sm:block text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-blue-200">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-yellow-500" /> {SCHOOL_INFO.phones[0]}
            </span>
            <span className="flex items-center gap-1 border-l border-blue-800 pl-4">
              <Mail className="h-3.5 w-3.5 text-yellow-500" /> {SCHOOL_INFO.email}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-blue-900/80 text-yellow-400 px-2.5 py-0.5 rounded text-[10px] font-bold border border-yellow-500/20">
              Affiliation: RBSE Sec. & Sr. Sec.
            </span>
            <span className="text-sky-300 font-medium">Session: {SCHOOL_INFO.session}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <div className="bg-yellow-500/10 p-2.5 rounded-xl border border-yellow-500/20 mr-3">
              <GraduationCap className="h-9 w-9 text-yellow-500" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl tracking-tight leading-none text-white">
                {SCHOOL_INFO.name.split('SR. SEC.')[0]}
              </h1>
              <p className="text-xs text-yellow-500 font-bold mt-1 tracking-wider uppercase">SR. SEC. SCHOOL • BARROD</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white hover:text-yellow-500 p-2 rounded-lg hover:bg-blue-900/40 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-950/95 border-b border-blue-900 p-6 absolute w-full shadow-2xl backdrop-blur-md">
          <div className="flex flex-col space-y-4">
            <NavLinks />
          </div>
        </div>
      )}
    </header>
  );
}
