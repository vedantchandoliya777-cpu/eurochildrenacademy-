/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GraduationCap, ChevronRight, Eye, EyeOff, Shield, Users, Heart } from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';

interface LoginScreenProps {
  setView: (view: string) => void;
  setUserRole: (role: 'admin' | 'teacher' | 'parent') => void;
}

export default function LoginScreen({ setView, setUserRole }: LoginScreenProps) {
  const [role, setRole] = useState<'admin' | 'teacher' | 'parent'>('admin');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      setErrorMsg('Please enter both ID and password.');
      return;
    }
    
    // Simple authentication
    setUserRole(role);
    setView('admin-dashboard');
  };

  const getRoleIcon = (currentRole: string) => {
    switch (currentRole) {
      case 'admin': return <Shield className="h-5 w-5" />;
      case 'teacher': return <GraduationCap className="h-5 w-5" />;
      default: return <Users className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white/10 backdrop-blur-md border border-white/10 max-w-md w-full rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="text-center mb-6 relative z-10">
          <div className="bg-yellow-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
            <GraduationCap className="h-10 w-10 text-yellow-500 animate-pulse" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">ECA ERP Portal</h2>
          <p className="text-blue-200 text-xs sm:text-sm mt-1">Access school management records</p>
        </div>

        {/* Role Selectors */}
        <div className="flex bg-blue-950/60 border border-blue-900 rounded-2xl p-1.5 mb-6 relative z-10 gap-1">
          {(['admin', 'teacher', 'parent'] as const).map(r => (
            <button
              key={r}
              type="button"
              onClick={() => { setRole(r); setErrorMsg(''); }}
              className={`flex-1 py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer ${
                role === r 
                  ? 'bg-yellow-500 text-blue-950 shadow-lg font-black' 
                  : 'text-blue-200 hover:text-white hover:bg-white/5'
              }`}
              id={`role-btn-${r}`}
            >
              {getRoleIcon(r)}
              {r}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 text-red-100 rounded-xl text-xs text-center mb-4 font-semibold animate-pulse">
            {errorMsg}
          </div>
        )}

        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold text-blue-100 mb-1.5 uppercase tracking-wider">Portal Username / ID</label>
            <input 
              type="text" 
              required 
              value={userId}
              onChange={e => { setUserId(e.target.value); setErrorMsg(''); }}
              className="w-full bg-blue-950/40 border border-blue-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-blue-300/40 text-sm outline-none transition-all" 
              placeholder={`e.g. ${role === 'admin' ? 'director' : role === 'teacher' ? 'STF-102' : 'STU-2601'}`}
              id="login-username"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-blue-100 uppercase tracking-wider">Secret Password</label>
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={e => { setPassword(e.target.value); setErrorMsg(''); }}
                className="w-full bg-blue-950/40 border border-blue-800 text-white rounded-xl py-3 pl-4 pr-11 focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-blue-300/40 text-sm outline-none transition-all" 
                placeholder="••••••••" 
                id="login-password"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/5 rounded-lg text-blue-300 hover:text-white transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
            <label className="flex items-center text-blue-200 cursor-pointer select-none">
              <input type="checkbox" className="mr-2 rounded border-blue-800 bg-blue-950/50 text-yellow-500 focus:ring-yellow-500 h-4 w-4" />
              Keep logged in
            </label>
            <button 
              type="button" 
              onClick={() => alert(`ERP administrator has been notified. Password recovery instructions have been sent to registered mobile.`)}
              className="text-yellow-400 hover:text-yellow-300 font-semibold"
            >
              Reset Password?
            </button>
          </div>

          <button 
            type="submit" 
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-black py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 transform hover:-translate-y-0.5 cursor-pointer text-sm uppercase tracking-wider"
            id="login-submit"
          >
            Authenticate Portal
          </button>
        </form>
        
        <div className="mt-6 text-center border-t border-white/10 pt-5 relative z-10">
          <button 
            onClick={() => setView('home')} 
            className="text-xs sm:text-sm text-blue-300 hover:text-white inline-flex items-center justify-center font-bold gap-1 group transition-colors cursor-pointer"
            id="login-return-btn"
          >
            <ChevronRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> 
            Return to School Website
          </button>
        </div>
      </div>
    </div>
  );
}
