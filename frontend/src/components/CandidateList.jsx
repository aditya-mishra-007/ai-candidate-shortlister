import React from 'react';
import { Database, Award, Trash2 } from 'lucide-react';

export default function CandidateList({ candidates, onCandidateDeleted }) {
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this candidate profile?")) return;
    
    try {
      const res = await fetch(`https://candidate-shortlister-backend.onrender.com/api/candidates/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        onCandidateDeleted(); // Refresh list automatically
      }
    } catch (err) {
      console.error("Failed to delete candidate profile:", err);
    }
  };

  return (
    <div className="backdrop-blur-md bg-gray-900/40 border border-gray-800/80 p-6 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-emerald-500/20 transition-all duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-950/50 rounded-xl border border-emerald-800/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
            <Database size={22} />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">Active Database Pool</h3>
        </div>
        <span className="text-xs font-mono bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 px-3 py-1 rounded-full font-black">
          {candidates.length} Profiles
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 max-h-[420px] pr-1">
        {candidates.length === 0 ? (
          <div className="text-center py-20 text-sm text-gray-500 font-medium">No candidate records indexed in MongoDB.</div>
        ) : (
          candidates.map((cand, idx) => (
            <div key={idx} className="bg-gray-950/40 border border-gray-900 p-4 rounded-xl flex items-center justify-between gap-3 group hover:border-gray-800 hover:bg-gray-950/80 transition-all duration-200">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-white tracking-wide truncate">{cand.name}</h4>
                <p className="text-xs text-gray-500 font-mono truncate">{cand.email}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {cand.skills.map((s, i) => (
                    <span key={i} className="text-[10px] font-bold bg-gray-900 text-gray-400 px-2 py-0.5 rounded-md border border-gray-800/80">{s}</span>
                  ))}
                </div>
              </div>
              
              <div className="shrink-0 flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-900 px-2.5 py-1.5 rounded-lg border border-gray-800 text-xs font-black text-gray-300">
                  <Award size={12} className="text-emerald-500" /> {cand.experience} Yrs
                </div>
                <button 
                  onClick={() => handleDelete(cand._id)}
                  className="p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-950/20 border border-transparent hover:border-rose-900/30 rounded-lg transition-all duration-200 opacity-80 group-hover:opacity-100"
                  title="Delete Profile"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}