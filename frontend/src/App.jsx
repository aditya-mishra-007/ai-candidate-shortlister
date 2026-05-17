import React, { useState, useEffect } from 'react';
import CandidateForm from './components/CandidateForm';
import JobRequirementForm from './components/JobRequirementForm';
import CandidateList from './components/CandidateList';
import ShortlistDisplay from './components/ShortlistDisplay';
import AIChatbot from './components/AIChatbot';

export default function App() {
  const [results, setResults] = useState([]);
  const [isAi, setIsAi] = useState(false);
  const [allCandidates, setAllCandidates] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  // Poll real-time database pool allocations [cite: 44-45]
  useEffect(() => {
    fetch('https://candidate-shortlister-backend.onrender.com/api/candidates')
      .then(res => res.json())
      .then(data => setAllCandidates(data))
      .catch(err => console.error('Cloud database interaction sync error:', err));
  }, [triggerRefresh]);

  const handleMatchResults = (data, aiModeActive) => {
    setResults(data);
    setIsAi(aiModeActive);
  };

  const handleResetResults = () => {
    setResults([]);
    setIsAi(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-6 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Premium Header Layout with Glowing Accent Highlights */}
      <header className="bg-gray-900/30 border border-gray-800/60 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-purple-500/40"></div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            AI Candidate Shortlisting Engine
          </h1>
          <p className="text-gray-400 text-xs mt-1 font-bold tracking-wider uppercase">MERN Full-Stack ESE Production Dashboard</p>
        </div>
        <div className="text-[11px] font-mono flex items-center gap-2 bg-gray-950/80 px-4 py-2 rounded-xl border border-gray-800 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></span>
          <span className="text-gray-300">Live Connected to Render Infrastructure</span>
        </div>
      </header>

      {/* Balanced 3-Column Bento Grid Panel */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1 min-h-[600px]">
        {/* Column 1: Core Action Inputs */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <CandidateForm onCandidateAdded={() => setTriggerRefresh(!triggerRefresh)} />
          <JobRequirementForm onMatchResults={handleMatchResults} />
        </div>
        
        {/* Column 2: Live Cluster Record Stream */}
        <div className="lg:col-span-4">
          <CandidateList 
            candidates={allCandidates} 
            onCandidateDeleted={() => setTriggerRefresh(!triggerRefresh)} 
          />
        </div>
        
        {/* Column 3: Processing & Evaluation Outputs */}
        <div className="lg:col-span-4">
          <ShortlistDisplay 
            results={results} 
            isAi={isAi} 
            onReset={handleResetResults} 
          />
        </div>
      </main>

      {/* Floating Interactive Chatbot Assist Widget Entry Portal  */}
      <AIChatbot />
    </div>
  );
}