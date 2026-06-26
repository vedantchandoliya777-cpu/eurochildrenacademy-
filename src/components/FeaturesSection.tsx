/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Monitor, Bus, FileText, Award, MapPin, Phone, Mail, 
  Send, User, Shield, Compass, BookOpen, Heart, Laptop
} from 'lucide-react';
import { SCHOOL_INFO } from '../schoolData';

export default function FeaturesSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    query: '',
    classInterest: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', email: '', query: '', classInterest: '' });
    }, 4000);
  };

  return (
    <div className="bg-gray-50 font-sans">
      
      {/* Principal & Director Message Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200" id="academics">
        <div className="text-center mb-16">
          <h2 className="text-xs text-yellow-600 font-extrabold tracking-widest uppercase">LEADERSHIP</h2>
          <p className="mt-2 text-3xl sm:text-4xl leading-8 font-black tracking-tight text-blue-950">
            Messages from Management
          </p>
          <div className="h-1 w-16 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Director Card */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-black text-xl border-2 border-yellow-500">
                  MS
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-950">{SCHOOL_INFO.director}</h3>
                  <p className="text-xs font-bold text-yellow-600 uppercase tracking-wide">Founder & Director, ECA</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "Our aim is not merely to transmit knowledge but to empower our youngsters to face the future with confidence, character, and courage. At Euro Children Academy, we strive to build a foundation where students discover their capabilities in academics, technology, and sports. Barrod deserves the best, and we are delivering it."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
              <span>Established ECA in 2011</span>
              <span>Barrod, Rajasthan</span>
            </div>
          </div>

          {/* Principal Card */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-black text-xl border-2 border-yellow-500">
                  SC
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-950">{SCHOOL_INFO.principal}</h3>
                  <p className="text-xs font-bold text-yellow-600 uppercase tracking-wide">Principal, ECA</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "Education is a shared commitment between dedicated teachers, motivated students, and supportive parents. Under the Rajasthan Board guidelines, we merge RBSE excellence with high-standard spoken English, smart board interactions, and individualized counseling. Welcome to a dynamic and loving community."
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
              <span>Rajasthan Board Curriculum</span>
              <span>English & Hindi Medium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white" id="facilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xs text-yellow-600 font-extrabold tracking-widest uppercase">RESOURCES</h2>
            <p className="mt-2 text-3xl sm:text-4xl leading-8 font-black tracking-tight text-blue-950">
              State-of-the-Art Facilities
            </p>
            <div className="h-1 w-16 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Smart Classrooms", 
                desc: "Interactive flat panel digital displays and modern audiovisual presentation aids for responsive learning.", 
                icon: Monitor, 
                color: "bg-blue-100 text-blue-700 border-blue-200" 
              },
              { 
                title: "GPS-Enabled Transport", 
                desc: "Secure, tracked transport services covering Barrod, Behror, Neemrana, and nearby regions for worry-free commutes.", 
                icon: Bus, 
                color: "bg-yellow-100 text-yellow-700 border-yellow-200" 
              },
              { 
                title: "Advanced Laboratories", 
                desc: "Equipped Physics, Chemistry, Biology, and computer suites aiding secondary practical examination prep.", 
                icon: FileText, 
                color: "bg-green-100 text-green-700 border-green-200" 
              },
              { 
                title: "Sports & Athletics", 
                desc: "Spacious playgrounds with equipment for Cricket, Volley, Kabaddi, and Badminton training by expert instructors.", 
                icon: Compass, 
                color: "bg-orange-100 text-orange-700 border-orange-200" 
              },
              { 
                title: "Computer Literacy", 
                desc: "Broadband connected IT laboratory ensuring computer literacy starting from early primary standard levels.", 
                icon: Laptop, 
                color: "bg-indigo-100 text-indigo-700 border-indigo-200" 
              },
              { 
                title: "Value Education", 
                desc: "Specialized regular moral grooming assemblies, speech competitions, and personality enhancement classes.", 
                icon: Shield, 
                color: "bg-teal-100 text-teal-700 border-teal-200" 
              }
            ].map((facility, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-900/10 flex flex-col justify-between group"
                id={`facility-card-${idx}`}
              >
                <div>
                  <div className={`inline-flex p-3 rounded-2xl border ${facility.color} mb-6 transform group-hover:scale-110 transition-transform`}>
                    <facility.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-blue-950 mb-3">{facility.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{facility.desc}</p>
                </div>
                <div className="h-1.5 w-12 bg-gray-100 group-hover:bg-yellow-500 transition-colors rounded-full mt-6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Streams */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="text-center mb-16">
          <h2 className="text-xs text-yellow-600 font-extrabold tracking-widest uppercase">CURRICULUM</h2>
          <p className="mt-2 text-3xl sm:text-4xl leading-8 font-black tracking-tight text-blue-950">
            Streams & Academic Stages
          </p>
          <div className="h-1 w-16 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { stage: "Pre-Primary", classes: "Nursery, LKG, UKG", focus: "Play-way teaching methodology, basic phonics, numbers learning, social interaction, and early speech development." },
            { stage: "Primary Level", classes: "Class 1 to 5", focus: "Language fluency (English & Hindi), core arithmetic, Environment Studies (EVS), crafts, and general physical training." },
            { stage: "Middle & Secondary", classes: "Class 6 to 10", focus: "Systematic Social Sciences, Advanced Mathematics, General Sciences, ICT, and strict RBSE Board preparation." },
            { stage: "Senior Secondary", classes: "Class 11 & 12", focus: "Specialized streams including Science (Biology/Maths), Commerce (Accounts/B.St), and Arts (Pol Science, History, Hindi/English Literature)." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <span className="text-yellow-600 font-black text-xs uppercase tracking-widest block mb-1">Stage 0{idx+1}</span>
              <h4 className="text-lg font-black text-blue-950 mb-2">{item.stage}</h4>
              <p className="bg-blue-50 text-blue-950 text-xs font-bold px-3 py-1.5 rounded-lg inline-block mb-4">{item.classes}</p>
              <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">{item.focus}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Contact & Map section */}
      <section className="py-20 bg-white border-t border-gray-200" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-xs text-yellow-600 font-extrabold tracking-widest uppercase">LOCATION</h2>
                <p className="mt-2 text-3xl font-black text-blue-950">Get in Touch</p>
                <div className="h-1 w-12 bg-yellow-500 mt-3 rounded-full"></div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                Have inquiries about admission criteria, school bus routes, fees, or documents? Fill out the quick contact form, and our coordinator will contact you via Phone/WhatsApp within 24 hours.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <MapPin className="h-6 w-6 text-blue-900 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-950 text-sm">Campus Address</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{SCHOOL_INFO.address}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <Phone className="h-6 w-6 text-blue-900 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-950 text-sm">Phone Contacts</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{SCHOOL_INFO.phones.join(', ')}</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <Mail className="h-6 w-6 text-blue-900 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-blue-950 text-sm">Email Address</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">{SCHOOL_INFO.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/5 border border-gray-100 shadow-xl p-6 sm:p-10 rounded-3xl bg-white relative">
                <h3 className="text-xl font-bold text-blue-950 mb-6 flex items-center gap-2">
                  <Send className="h-5 w-5 text-yellow-500" />
                  Quick Query / Call Back Request
                </h3>

                {submitted ? (
                  <div className="p-8 bg-green-50 border border-green-200 rounded-2xl text-center space-y-3">
                    <div className="h-12 w-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                      <Award className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-green-900 text-lg">Thank You for Contacting ECA!</h4>
                    <p className="text-sm text-green-700">We have received your query. Our management representative will call you back shortly on your contact number.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Full Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-white" 
                          id="contact-name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Contact Number</label>
                        <input 
                          type="tel" 
                          required 
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Mobile / WhatsApp"
                          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-white" 
                          id="contact-phone"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Email Address (Optional)</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="example@gmail.com"
                          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-white" 
                          id="contact-email"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Class of Interest</label>
                        <select 
                          value={formData.classInterest}
                          onChange={e => setFormData({ ...formData, classInterest: e.target.value })}
                          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-white"
                          id="contact-class"
                        >
                          <option value="">Select Target Class</option>
                          <option value="Pre-Primary">Nursery to UKG</option>
                          <option value="Primary">Class 1 to 5</option>
                          <option value="Middle">Class 6 to 8</option>
                          <option value="Secondary">Class 9 & 10</option>
                          <option value="SrSec-Sci">Class 11 & 12 (Science)</option>
                          <option value="SrSec-Com">Class 11 & 12 (Commerce)</option>
                          <option value="SrSec-Arts">Class 11 & 12 (Arts)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">Your Inquiry/Query</label>
                      <textarea 
                        rows={4} 
                        required
                        value={formData.query}
                        onChange={e => setFormData({ ...formData, query: e.target.value })}
                        placeholder="Write details about fees, bus routes, syllabus or custom requests..."
                        className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm outline-none bg-white"
                        id="contact-query"
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full py-4 bg-blue-950 hover:bg-blue-900 text-white font-extrabold text-sm rounded-xl shadow-lg transition-colors cursor-pointer text-center"
                      id="contact-submit-btn"
                    >
                      Submit Inquiry Details
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
