/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, Phone, Users, Award, Calendar, BookOpen, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';

interface HeroSectionProps {
  setView: (view: string) => void;
}

export default function HeroSection({ setView }: HeroSectionProps) {
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-20 flex flex-col justify-center min-h-screen bg-blue-950 overflow-hidden" id="hero-section">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 opacity-95"></div>
        {/* Animated ambient circles */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content col */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs sm:text-sm font-bold tracking-wider uppercase animate-bounce">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              ADMISSIONS OPEN SESSION {SCHOOL_INFO.session}
            </div>
            
            <h1 className="text-white font-black text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1] drop-shadow-md">
              {SCHOOL_INFO.name}
            </h1>
            
            <p className="text-yellow-500 text-lg sm:text-xl font-bold tracking-wide uppercase">
              BARROD • BEHROR • ALWAR
            </p>

            <p className="text-blue-100 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
              {SCHOOL_INFO.tagline}. A premiere institution dedicated to academic brilliance, moral grooming, and athletic development. Empowering rural education with urban facilities in Alwar District.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => setView('admission')}
                className="bg-yellow-500 text-blue-950 px-8 py-4 rounded-xl font-extrabold shadow-xl shadow-yellow-500/10 hover:bg-yellow-400 hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group cursor-pointer text-base"
                id="hero-apply-btn"
              >
                Online Registration <ArrowRight className="h-5 w-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button 
                onClick={handleScrollToContact}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:border-white/40 px-8 py-4 rounded-xl font-bold hover:bg-white/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer text-base"
                id="hero-contact-btn"
              >
                <Phone className="h-5 w-5 text-sky-400" /> Consult Admissions
              </button>
            </div>

            {/* Badges */}
            <div className="pt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs sm:text-sm text-blue-200">
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4.5 w-4.5 text-yellow-500" /> RBSE Affiliated</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4.5 w-4.5 text-yellow-500" /> English & Hindi Medium</span>
              <span className="flex items-center gap-1.5"><CheckCircle className="h-4.5 w-4.5 text-yellow-500" /> Smart Classrooms</span>
            </div>
          </div>

          {/* Graphical/Interactive Notice Board col */}
          <div className="lg:col-span-5 bg-blue-900/40 border border-blue-800/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-2xl relative">
            <div className="absolute top-0 right-0 bg-yellow-500 text-blue-950 font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-3xl text-xs uppercase tracking-wider">
              Notice Board
            </div>
            
            <h3 className="text-white text-xl font-extrabold mb-6 flex items-center gap-2.5">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-ping"></span>
              Latest Updates
            </h3>
            
            <div className="space-y-4">
              {[
                { date: "June 25", text: "Registrations for session 2026-27 are now active online. Visit Admissions tab." },
                { date: "June 20", text: "Excellent RBSE Board Results 2025-26: Multiple students achieved 95%+ marks!" },
                { date: "June 15", text: "Free transport registration starts this week for students from Behror city & local villages." },
                { date: "June 05", text: "Summer Special Extra Classes and Sports training camp concluded successfully." }
              ].map((notice, idx) => (
                <div key={idx} className="p-3.5 bg-blue-950/60 border border-blue-800/40 rounded-2xl flex gap-3.5 hover:bg-blue-950/90 transition-colors">
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl h-12 w-12 flex flex-col justify-center items-center flex-shrink-0">
                    <span className="text-[10px] text-yellow-500 font-bold uppercase leading-none">{notice.date.split(' ')[0]}</span>
                    <span className="text-sm text-yellow-400 font-black leading-tight mt-0.5">{notice.date.split(' ')[1]}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100 leading-snug">{notice.text}</p>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setView('admission')}
              className="mt-6 w-full py-3 bg-blue-800 hover:bg-blue-700/80 border border-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 group cursor-pointer"
            >
              Get Prospectus 2026 <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Stats strip */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto w-full">
          {[
            { label: 'Students Enrolled', value: '1500+', desc: 'From over 15 surrounding villages', icon: Users },
            { label: 'Expert Educators', value: '50+', desc: 'Well-trained & highly experienced', icon: Award },
            { label: 'Acres Green Campus', value: '3+', desc: 'Equipped with modern playfields', icon: Calendar },
            { label: 'RBSE Board Results', value: '100%', desc: 'Consistency in Board examinations', icon: BookOpen }
          ].map((stat, idx) => (
            <div key={idx} className="bg-blue-900/20 backdrop-blur-md border border-blue-800/40 rounded-2xl p-5 text-center transform transition duration-300 hover:scale-105 hover:bg-blue-900/40 group">
              <stat.icon className="h-8 w-8 text-yellow-500 mx-auto mb-3 group-hover:animate-bounce transition-all" />
              <h3 className="text-2xl sm:text-3xl font-black text-white">{stat.value}</h3>
              <p className="text-xs sm:text-sm font-bold text-yellow-500 uppercase tracking-wide mt-1">{stat.label}</p>
              <p className="text-[11px] text-blue-300 font-medium mt-1 leading-normal">{stat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
