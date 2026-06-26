/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bus, MapPin, Search, Shield, Clock, Compass, PhoneCall, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BusRoute } from '../types';

interface TransportModuleProps {
  busRoutes: BusRoute[];
}

export default function TransportModule({ busRoutes }: TransportModuleProps) {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(busRoutes[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedRoute = busRoutes.find(b => b.id === selectedRouteId) || busRoutes[0];

  const filteredRoutes = busRoutes.filter(route => 
    route.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.driver.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 flex flex-col h-full font-sans">
      
      {/* Header Info */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-extrabold text-blue-950 text-base">GPS Tracking Console</h3>
          <p className="text-xs text-gray-400 mt-1">Real-time telemetry and schedule compliance for school transport fleet.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-ping"></span> 
            Active Routes: {busRoutes.filter(b => b.status !== 'Completed' && b.status !== 'Inactive').length}
          </span>
          <span className="flex items-center text-xs font-bold text-gray-500 bg-slate-50 px-3 py-1.5 rounded-full border border-gray-200/60">
            Completed: {busRoutes.filter(b => b.status === 'Completed').length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Map Area Mockup (Left 8 Cols) */}
        <div className="lg:col-span-8 bg-slate-100 rounded-3xl border border-gray-200 shadow-sm relative min-h-[450px] overflow-hidden flex flex-col justify-between p-6">
          
          {/* Visual Map Pattern */}
          <div className="absolute inset-0 z-0 bg-[#e5e9f0]" style={{ backgroundImage: 'radial-gradient(#a3b1cc 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          {/* Simulated Map Streets */}
          <svg className="absolute inset-0 w-full h-full opacity-20 stroke-blue-900 stroke-[4] fill-none z-0">
            <path d="M 0,100 L 800,100 M 150,0 L 150,600 M 450,0 L 450,600 M 0,350 L 800,350 M 650,0 L 650,600" />
            <circle cx="150" cy="100" r="10" className="fill-blue-500" />
            <circle cx="450" cy="350" r="10" className="fill-blue-500" />
          </svg>

          {/* Map Controls */}
          <div className="relative z-10 self-start bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 max-w-sm">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-500 p-2 rounded-xl text-blue-950">
                <Bus className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-extrabold text-blue-950 text-sm">{selectedRoute.route.split(' - ')[1]}</h4>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5 tracking-wider uppercase">Active Bus Tracker</p>
                <div className="mt-2 text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-blue-900" /> 
                  Next Stop: <span className="text-blue-950">{selectedRoute.currentStop}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Bus Pins on Map */}
          <div className="absolute top-[18%] left-[12%] animate-bounce z-10">
             <div className="bg-green-600 p-2.5 rounded-full shadow-xl border-2 border-white flex flex-col items-center">
               <Bus className="h-4 w-4 text-white" />
               <span className="absolute -bottom-6 bg-blue-950 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">Route 1</span>
             </div>
          </div>

          <div className="absolute bottom-[35%] right-[22%] animate-bounce z-10" style={{ animationDelay: '1.5s' }}>
             <div className="bg-amber-500 p-2.5 rounded-full shadow-xl border-2 border-white flex flex-col items-center">
               <Bus className="h-4 w-4 text-white" />
               <span className="absolute -bottom-6 bg-blue-950 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">Route 2</span>
             </div>
          </div>

          <div className="absolute top-[48%] left-[55%] animate-bounce z-10" style={{ animationDelay: '2.5s' }}>
             <div className="bg-green-600 p-2.5 rounded-full shadow-xl border-2 border-white flex flex-col items-center">
               <Bus className="h-4 w-4 text-white" />
               <span className="absolute -bottom-6 bg-blue-950 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap">Route 3</span>
             </div>
          </div>

          {/* Central message overlay */}
          <div className="relative z-10 self-center bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow border border-white/40 text-center max-w-md mx-auto">
            <p className="text-xs text-blue-950 font-bold">📡 SIMULATION ACTIVE • Updates location coordinates every 5 seconds</p>
          </div>

          {/* Telemetry Footer */}
          <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="text-center sm:text-left">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Telemetry Status</span>
              <span className={`text-xs font-black flex items-center justify-center sm:justify-start gap-1 mt-1 ${selectedRoute.status === 'On Time' ? 'text-green-600' : 'text-amber-500'}`}>
                {selectedRoute.status === 'On Time' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                {selectedRoute.status}
              </span>
            </div>
            <div className="text-center sm:text-left border-l border-gray-100 pl-0 sm:pl-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Current Speed</span>
              <span className="text-sm font-black text-blue-950 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <Compass className="h-4 w-4 text-yellow-500" />
                {selectedRoute.speed}
              </span>
            </div>
            <div className="text-center sm:text-left border-l border-gray-100 pl-0 sm:pl-4 col-span-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Driver Contact Incharge</span>
              <span className="text-xs font-bold text-gray-700 flex items-center justify-center sm:justify-start gap-1.5 mt-1 truncate">
                <Shield className="h-4 w-4 text-blue-900" />
                {selectedRoute.driver}
              </span>
            </div>
          </div>

        </div>

        {/* Bus List & Status (Right 4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col overflow-hidden h-[450px]">
          
          <div className="p-4 border-b border-gray-100 bg-slate-50/50">
            <div className="relative">
              <Search className="h-4.5 w-4.5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search route driver or location..." 
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {filteredRoutes.map((bus) => (
              <div 
                key={bus.id} 
                onClick={() => setSelectedRouteId(bus.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group ${
                  selectedRouteId === bus.id 
                    ? 'bg-blue-50/70 border-blue-200' 
                    : 'bg-white border-gray-100/80 hover:border-blue-900/15 hover:bg-slate-50/40'
                }`}
                id={`bus-route-item-${bus.id}`}
              >
                <div className="space-y-1">
                  <h4 className={`font-extrabold text-xs sm:text-sm transition-colors ${
                    selectedRouteId === bus.id ? 'text-blue-950 font-black' : 'text-gray-800 group-hover:text-blue-900'
                  }`}>
                    {bus.route.split(' - ')[0]}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-bold">{bus.route.split(' - ')[1]}</p>
                  <p className="text-[10px] text-gray-400 font-semibold flex items-center mt-1">
                    <Shield className="h-3 w-3 mr-1 text-blue-900" /> {bus.driver.split(' (')[0]}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    bus.status === 'On Time' 
                      ? 'bg-green-50 text-green-700' 
                      : bus.status === 'Completed' 
                      ? 'bg-slate-100 text-slate-500' 
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {bus.status}
                  </span>
                  <span className="text-[10px] text-gray-400 font-semibold mt-1">{bus.speed}</span>
                </div>
              </div>
            ))}
            {filteredRoutes.length === 0 && (
              <p className="text-center text-xs text-gray-400 py-6 font-semibold">No bus routes found.</p>
            )}
          </div>
          
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <button 
              onClick={() => alert(`Broadcasting telemetry sync request to all active GPS receivers... Telemetry validated.`)}
              className="w-full py-2.5 bg-blue-950 text-white text-xs font-extrabold rounded-xl hover:bg-blue-900 transition-colors cursor-pointer text-center"
              id="btn-broadcast-bus"
            >
              Force Broadcaster Sync
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
