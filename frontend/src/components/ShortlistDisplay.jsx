import React from 'react';
import { Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ShortlistDisplay({ results, isAi }) {
  if (!results || results.length === 0) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-2xl text-center text-gray-500 font-medium h-full flex flex-col items-center justify-center min-h-[350px]">
        <Layers size={32} className="text-gray-700 mb-2 stroke-[1.5]" />
        <p className="text-xs max-w-xs">Run a matching criteria calculation to render evaluation output arrays.</p>
      </div>
    );
  }

  // Handle qualitative structural analysis strings from OpenRouter API
  if (isAi && typeof results === 'string') {
    return (
      <div className="bg-gray-900/50 backdrop-blur-md border border-purple-500/20 p-6 rounded-2xl shadow-xl h-full flex flex-col">
        <div className="flex items-center gap-2.5 mb-3.5 shrink-0">
          <div className="p-1.5 bg-purple-950/50 rounded-lg border border-purple-800/50 text-purple-400">
            <Sparkles size={16} />
          </div>
          <h3 className="text-base font-bold text-purple-400 tracking-tight">AI Recommendation Matrix</h3>
        </div>
        <div className="bg-gray-950/70 border border-gray-800/60 p-4 rounded-xl text-gray-300 font-mono text-xs whitespace-pre-wrap leading-relaxed flex-1 overflow-y-auto max-h-[480px]">
          {results}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-xl h-full flex flex-col">
      <h3 className="text-base font-bold text-emerald-400 mb-4 shrink-0">Shortlisted & Ranked Results</h3>
      <div className="space-y-3 overflow-y-auto flex-1 max-h-[480px] pr-1">
        {results.map((candidate, index) => (
          <div key={index} className="bg-gray-950/60 border border-gray-900 p-3.5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all hover:border-gray-800">
            <div>
              <h4 className="text-sm font-bold text-white">{candidate.name}</h4>
              <p className="text-[11px] text-gray-500 font-mono mb-2">{candidate.email} • {candidate.experience} Yrs Exp</p>
              
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase">Skills Matched:</span>
                <div className="flex flex-wrap gap-1">
                  {candidate.skillsMatched && candidate.skillsMatched.length > 0 ? (
                    candidate.skillsMatched.map((skill, idx) => (
                      <span key={idx} className="text-[9px] font-bold bg-emerald-950/30 text-emerald-400 px-2 py-0.5 rounded border border-emerald-900/30 flex items-center gap-1">
                        <CheckCircle2 size={9} /> {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-[9px] text-rose-400 font-medium">None</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="shrink-0 sm:text-right">
              <span className={`font-mono text-xs font-black px-2.5 py-1 rounded-xl border ${
                candidate.matchScore >= 0.7 ? 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50' :
                candidate.matchScore >= 0.4 ? 'bg-amber-950/50 text-amber-400 border-amber-800/50' :
                'bg-rose-950/50 text-rose-400 border-rose-800/50'
              }`}>
                {Math.round(candidate.matchScore * 100)}% Match
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}