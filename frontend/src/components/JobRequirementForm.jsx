import React, { useState } from 'react';
import { Sliders, Cpu } from 'lucide-react';

export default function JobRequirementForm({ onMatchResults }) {
  const [reqSkills, setReqSkills] = useState('');
  const [minExp, setMinExp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFetchMatch = async (endpoint) => {
    if (!reqSkills || !minExp) return;
    setLoading(true);
    
    const payload = {
      requiredSkills: reqSkills.split(',').map(s => s.trim()).filter(s => s.length > 0),
      minExperience: Number(minExp)
    };

    try {
      const res = await fetch(`https://candidate-shortlister-backend.onrender.com/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      onMatchResults(data, endpoint === 'ai/shortlist');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/20 backdrop-blur-xl border border-gray-800 p-5 rounded-2xl shadow-xl flex-1 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all duration-300"></div>
      
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <div className="p-2 bg-purple-950/40 rounded-xl border border-purple-800/40 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <Sliders size={20} />
        </div>
        <h3 className="text-lg font-black text-white tracking-tight">Define Job Requirements</h3>
      </div>

      <div className="space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Required Skillsets</label>
            <input type="text" value={reqSkills} onChange={e => setReqSkills(e.target.value)} className="w-full p-2.5 rounded-xl bg-gray-950/80 border border-gray-800/80 text-white text-sm font-medium focus:outline-none focus:border-purple-500 transition-all" placeholder="React, Node.js" />
          </div>
          
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Minimum Experience Threshold</label>
            <input type="number" value={minExp} onChange={e => setMinExp(e.target.value)} className="w-full p-2.5 rounded-xl bg-gray-950/80 border border-gray-800/80 text-white text-sm font-medium focus:outline-none focus:border-purple-500 transition-all" placeholder="1" min="0" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <button type="button" onClick={() => handleFetchMatch('match')} disabled={loading} className="bg-gray-950 border border-gray-800 hover:bg-gray-800 text-gray-300 font-bold py-3 rounded-xl transition-all duration-200 text-xs uppercase tracking-wider disabled:opacity-40">
            Basic Match 📊
          </button>
          
          <button type="button" onClick={() => handleFetchMatch('ai/shortlist')} disabled={loading} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-3 rounded-xl shadow-md shadow-purple-950/40 transition-all duration-300 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider disabled:opacity-40">
            <Cpu size={14} /> {loading ? 'Running AI...' : 'AI Shortlist ✨'}
          </button>
        </div>
      </div>
    </div>
  );
}