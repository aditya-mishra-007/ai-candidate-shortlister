import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';

export default function CandidateForm({ onCandidateAdded }) {
  const [formData, setFormData] = useState({ name: '', email: '', skills: '', experience: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const candidatePayload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      experience: Number(formData.experience)
    };

    try {
      const res = await fetch('https://candidate-shortlister-backend.onrender.com/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(candidatePayload)
      });
      if (res.ok) {
        setFormData({ name: '', email: '', skills: '', experience: '' });
        onCandidateAdded();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/20 backdrop-blur-xl border border-gray-800 p-5 rounded-2xl shadow-xl flex-1 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all duration-300"></div>
      
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <div className="p-2 bg-cyan-950/40 rounded-xl border border-cyan-800/40 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
          <UserPlus size={20} />
        </div>
        <h3 className="text-lg font-black text-white tracking-tight">Add Candidate Profile</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2.5 rounded-xl bg-gray-950/80 border border-gray-800/80 text-white text-sm font-medium focus:outline-none focus:border-cyan-500 transition-all" placeholder="Rahul Sharma" />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2.5 rounded-xl bg-gray-950/80 border border-gray-800/80 text-white text-sm font-medium focus:outline-none focus:border-cyan-500 transition-all" placeholder="rahul@gmail.com" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Skills (Comma Split)</label>
              <input type="text" required value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="w-full p-2.5 rounded-xl bg-gray-950/80 border border-gray-800/80 text-white text-sm font-medium focus:outline-none focus:border-cyan-500 transition-all" placeholder="React, Node.js" />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Exp (Yrs)</label>
              <input type="number" required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="w-full p-2.5 rounded-xl bg-gray-950/80 border border-gray-800/80 text-white text-sm font-medium focus:outline-none focus:border-cyan-500 transition-all" placeholder="2" min="0" />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black py-3 px-4 rounded-xl transition-all duration-300 shadow-md shadow-cyan-950/50 text-xs uppercase tracking-wider mt-4 disabled:opacity-40">
          {loading ? 'Storing Record...' : 'Save Profile to Cloud Database'}
        </button>
      </form>
    </div>
  );
}