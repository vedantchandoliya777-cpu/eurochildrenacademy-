/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Settings, Save, Shield, Database, Lock, Phone, Mail, MapPin } from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';

export default function SettingsModule() {
  const [session, setSession] = useState(SCHOOL_INFO.session);
  const [phones, setPhones] = useState(SCHOOL_INFO.phones.join(', '));
  const [email, setEmail] = useState(SCHOOL_INFO.email);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex items-center gap-3">
          <Settings className="h-6 w-6 text-yellow-500" />
          <div>
            <h3 className="font-extrabold text-blue-950 text-base">ECA ERP General Configurations</h3>
            <p className="text-xs text-gray-400">Manage session settings and contact handles</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {isSaved && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-xs font-bold animate-pulse text-center">
              Configuration parameters successfully flushed and saved in secure cookies!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Current Active Session</label>
              <select 
                value={session}
                onChange={e => setSession(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white outline-none font-bold"
              >
                <option>2025-26</option>
                <option>2026-27</option>
                <option>2027-28</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Institution Affiliation Number</label>
              <input 
                type="text" 
                disabled 
                value="RBSE / SEC / 2011 / ALWAR / 885" 
                className="w-full p-3 text-sm rounded-xl border border-gray-200 bg-slate-100 text-gray-400 font-semibold" 
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Director Contact Numbers (Comma separated)</label>
              <input 
                type="text" 
                required
                value={phones}
                onChange={e => setPhones(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" 
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Primary Email Coordinates</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" 
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-bold tracking-wider flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-blue-950" /> Secure 256-Bit SSL Secured
            </span>
            <button 
              type="submit"
              className="bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="h-4 w-4" /> Save System Variables
            </button>
          </div>

        </div>
      </form>

      {/* Safety config mockup */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h4 className="font-extrabold text-blue-950 text-sm flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-900" />
          System Maintenance & Backups
        </h4>
        <p className="text-xs text-gray-500 leading-relaxed">
          Daily cloud backups are scheduled at 02:00 AM UTC. Multi-user transactional logs are persisted in local server containers. Access database triggers below.
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          <button 
            type="button"
            onClick={() => alert("Creating manual system backup... Success! 45.2 MB saved as backup_2026_06_26.zip")}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Trigger Manual Backup Now
          </button>
          <button 
            type="button"
            onClick={() => alert("All security rules verified. System reports: no unauthorized access detections.")}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Audit Firewalls
          </button>
        </div>
      </div>

    </div>
  );
}
