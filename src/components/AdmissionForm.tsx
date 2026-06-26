/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronRight, UploadCloud, GraduationCap, FileCheck, CheckCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';
import { Student } from '../types';

interface AdmissionFormProps {
  setView: (view: string) => void;
  onAdmitStudent: (newStudent: Omit<Student, 'id' | 'rollNo' | 'status' | 'admissionDate' | 'feesPaid' | 'feesTotal'>) => void;
}

export default function AdmissionForm({ setView, onAdmitStudent }: AdmissionFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    classApplying: '',
    gender: '',
    fatherName: '',
    contact: '',
    address: ''
  });
  
  const [photoName, setPhotoName] = useState('');
  const [aadharName, setAadharName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [assignedId, setAssignedId] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'aadhar') => {
    if (e.target.files && e.target.files[0]) {
      const name = e.target.files[0].name;
      if (type === 'photo') {
        setPhotoName(name);
      } else {
        setAadharName(name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call the parent state injector
    onAdmitStudent({
      name: formData.name,
      dob: formData.dob,
      class: formData.classApplying,
      gender: formData.gender,
      fatherName: formData.fatherName,
      contact: formData.contact,
      address: formData.address
    });

    const mockId = "STU-26" + Math.floor(10 + Math.random() * 90);
    setAssignedId(mockId);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        
        <button 
          onClick={() => setView('home')} 
          className="inline-flex items-center text-blue-900 hover:text-yellow-600 mb-6 font-bold text-sm bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 group transition-all"
          id="admission-back-btn"
        >
          <ChevronRight className="h-4 w-4 rotate-180 mr-1.5 group-hover:-translate-x-1 transition-transform" /> 
          Back to School Website
        </button>
        
        {isSuccess ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12 text-center space-y-6">
            <div className="h-20 w-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <FileCheck className="h-10 w-10" />
            </div>
            
            <h2 className="text-3xl font-black text-blue-950">Registration Submitted!</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              The admission request for <span className="font-bold text-blue-900">{formData.name}</span> has been processed successfully. A temporary student record has been generated in the ERP system.
            </p>

            <div className="bg-slate-50 rounded-2xl p-6 max-w-md mx-auto border border-gray-100 text-left space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-gray-200/60 pb-2">
                <span className="text-gray-400 font-medium">Assigned ERP ID</span>
                <span className="font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded">{assignedId}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-200/60 pb-2">
                <span className="text-gray-400 font-medium">Target Class</span>
                <span className="font-bold text-gray-700">{formData.classApplying}</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-1">
                <span className="text-gray-400 font-medium">Contact registered</span>
                <span className="font-bold text-gray-700">{formData.contact}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button 
                onClick={() => setView('home')} 
                className="bg-blue-950 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition-all text-sm cursor-pointer"
                id="success-home-btn"
              >
                Go to Website
              </button>
              <button 
                onClick={() => setView('login')} 
                className="bg-yellow-500 text-blue-950 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all text-sm cursor-pointer"
                id="success-erp-btn"
              >
                Login to ERP Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-blue-950 p-8 sm:p-10 text-white text-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl"></div>
              <GraduationCap className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
              <h2 className="text-3xl font-black mb-1">Online Admission Portal</h2>
              <p className="text-blue-200 text-sm">Academic Session {SCHOOL_INFO.session} • RBSE Curriculum</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              {/* Student Details */}
              <div>
                <h3 className="text-lg font-extrabold text-blue-950 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
                  Student Personal Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Full Student Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="As per previous school records" 
                      className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white" 
                      id="adm-name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Date of Birth <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      required 
                      value={formData.dob}
                      onChange={e => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white" 
                      id="adm-dob"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Class Applying For <span className="text-red-500">*</span></label>
                    <select 
                      required 
                      value={formData.classApplying}
                      onChange={e => setFormData({ ...formData, classApplying: e.target.value })}
                      className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      id="adm-class"
                    >
                      <option value="">Select Target Standard</option>
                      <option>Nursery</option>
                      <option>LKG</option>
                      <option>UKG</option>
                      <option>Class 1</option>
                      <option>Class 2</option>
                      <option>Class 3</option>
                      <option>Class 4</option>
                      <option>Class 5</option>
                      <option>Class 6</option>
                      <option>Class 7</option>
                      <option>Class 8</option>
                      <option>Class 9</option>
                      <option>Class 10</option>
                      <option>Class 11-Sci</option>
                      <option>Class 11-Com</option>
                      <option>Class 11-Arts</option>
                      <option>Class 12-Sci</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Gender <span className="text-red-500">*</span></label>
                    <select 
                      required 
                      value={formData.gender}
                      onChange={e => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      id="adm-gender"
                    >
                      <option value="">Select Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent Details */}
              <div>
                <h3 className="text-lg font-extrabold text-blue-950 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
                  Parent / Guardian Coordinates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Father's Full Name <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required 
                      value={formData.fatherName}
                      onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                      placeholder="Father's full name" 
                      className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                      id="adm-father"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">WhatsApp Contact No <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.contact}
                      onChange={e => setFormData({ ...formData, contact: e.target.value })}
                      placeholder="10 digit phone number" 
                      className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                      id="adm-phone"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Complete Residential Address <span className="text-red-500">*</span></label>
                    <textarea 
                      rows={3} 
                      required 
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Village, Tehsil, Landmark, Pincode"
                      className="w-full p-3 text-sm rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      id="adm-address"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Document Upload Mock */}
              <div>
                <h3 className="text-lg font-extrabold text-blue-950 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span>
                  Document Verification Enclosures
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative border-2 border-dashed border-gray-300 hover:border-yellow-500 rounded-2xl p-6 text-center hover:bg-yellow-500/5 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'photo')}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      id="adm-photo-file"
                    />
                    <UploadCloud className="h-8 w-8 text-blue-950 mx-auto mb-2 group-hover:text-yellow-600 transition-colors" />
                    <p className="text-xs font-bold text-blue-950">{photoName || 'Student Photograph'}</p>
                    <p className="text-[10px] text-gray-400 mt-1">PNG, JPG format up to 2MB</p>
                  </div>

                  <div className="relative border-2 border-dashed border-gray-300 hover:border-yellow-500 rounded-2xl p-6 text-center hover:bg-yellow-500/5 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept=".pdf,image/*"
                      onChange={(e) => handleFileChange(e, 'aadhar')}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      id="adm-aadhar-file"
                    />
                    <UploadCloud className="h-8 w-8 text-blue-950 mx-auto mb-2 group-hover:text-yellow-600 transition-colors" />
                    <p className="text-xs font-bold text-blue-950">{aadharName || 'Student Aadhar Card / Birth Certificate'}</p>
                    <p className="text-[10px] text-gray-400 mt-1">PDF, JPG format up to 4MB</p>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-base py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-center cursor-pointer"
                id="adm-submit"
              >
                Submit ECA Registration Form
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
