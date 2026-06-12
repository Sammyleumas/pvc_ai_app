/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { StudyModule } from '../types.ts';
import { soundManager } from '../utils/audio.ts';
import { Lock, Check, Award, Flame, Play } from 'lucide-react';

interface QuestMapProps {
  modules: StudyModule[];
  completedModules: number[];
  onSelectModule: (module: StudyModule) => void;
  currentXp: number;
}

export default function QuestMap({ modules, completedModules, onSelectModule, currentXp }: QuestMapProps) {
  // Determine if a module is unlocked
  // Code Logic: Module with index is unlocked if its previous index is completed. Module 1 (id: 1) is always unlocked.
  const isModuleUnlocked = (module: StudyModule, index: number) => {
    if (index === 0) return true;
    const previousId = modules[index - 1].id;
    return completedModules.includes(previousId);
  };

  return (
    <div id="quest-map-container" className="py-8 px-4 bg-[#080811] rounded-3xl border border-slate-900 overflow-hidden relative shadow-2xl">
      {/* Visual cyber mesh grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,16,16,0)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.04] pointer-events-none" />
      
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white flex items-center space-x-2">
            <span className="text-cyan-400">❖</span>
            <span>SIMULATION CORE CAMPAIGN</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
            Complete the tests sequence to earn PVC-AID Certificate credentials.
          </p>
        </div>
        
        {/* Simple Legend */}
        <div className="hidden md:flex items-center space-x-4 text-xs font-mono">
          <div className="flex items-center space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <span className="text-slate-400">Completed</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-pulse" />
            <span className="text-slate-400">Current/Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
            <span className="text-slate-400">Locked</span>
          </div>
        </div>
      </div>

      {/* Quest Trail Pathway Grid Layout */}
      <div className="p-4 sm:p-8 flex flex-col items-center bg-[#0d0d1b] rounded-2xl border border-blue-950/20 relative">
        <div className="w-full max-w-xl flex flex-col space-y-12 relative z-10">
          
          {modules.map((module, idx) => {
            const unlocked = isModuleUnlocked(module, idx);
            const completed = completedModules.includes(module.id);
            const isCurrentActive = unlocked && !completed;
            const nextModuleUnlocked = idx < modules.length - 1 && isModuleUnlocked(modules[idx + 1], idx + 1);

            return (
              <div key={module.id} className="relative flex items-center justify-between group">
                
                {/* Pathway joining cable line */}
                {idx < modules.length - 1 && (
                  <div 
                    className={`absolute left-10 sm:left-14 top-16 w-1 h-14 -translate-x-1/2 pointer-events-none transition-all duration-500 z-0 ${
                      nextModuleUnlocked 
                        ? 'bg-gradient-to-b from-blue-500 to-indigo-600' 
                        : 'bg-slate-900 border-l border-slate-800'
                    }`}
                  />
                )}

                {/* Left Node Indicator Node circle */}
                <motion.button
                  id={`quest-node-${module.id}`}
                  whileHover={unlocked ? { scale: 1.08 } : {}}
                  whileTap={unlocked ? { scale: 0.95 } : {}}
                  onClick={() => {
                    if (unlocked) {
                      soundManager.playClick();
                      onSelectModule(module);
                    } else {
                      soundManager.playFail();
                    }
                  }}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center relative z-10 transition-all cursor-pointer ${
                    completed
                      ? 'bg-slate-900 border-4 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] text-amber-400'
                      : isCurrentActive
                      ? 'bg-slate-900 border-4 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)] text-cyan-400'
                      : 'bg-[#121226] border-2 border-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {/* Internal Status Icon */}
                  {completed ? (
                    <div className="flex flex-col items-center">
                      <Check className="w-6 h-6 stroke-[3]" />
                      <span className="text-[10px] font-mono font-bold mt-0.5">LVL {module.levelNum}</span>
                    </div>
                  ) : !unlocked ? (
                    <div className="flex flex-col items-center">
                      <Lock className="w-5 h-5 text-slate-700" />
                      <span className="text-[9px] font-mono mt-0.5 text-slate-700">LOCKED</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center animate-none">
                      <Play className="w-6 h-6 fill-cyan-400 text-cyan-400 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold mt-0.5 tracking-wider">PLAY</span>
                    </div>
                  )}

                  {/* Level Counter Floating Badge */}
                  {unlocked && !completed && (
                    <div className="absolute -top-1.5 -right-1.5 bg-cyan-500 text-[#090912] font-mono font-black text-xs px-1.5 py-0.5 rounded-md shadow-md animate-bounce">
                      LVL {module.levelNum}
                    </div>
                  )}
                </motion.button>

                {/* Right Text Details Card panel */}
                <div 
                  onClick={() => unlocked && onSelectModule(module)}
                  className={`flex-1 ml-6 sm:ml-8 p-4 rounded-xl border transition-all text-left relative cursor-pointer ${
                    completed 
                      ? 'bg-amber-950/10 border-amber-500/20 hover:border-amber-400/35 shadow-[0_0_15px_rgba(245,158,11,0.02)]' 
                      : isCurrentActive
                      ? 'bg-blue-950/10 border-cyan-500/35 hover:border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.05)]'
                      : 'bg-[#0f0f1d]/50 border-slate-900 text-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase py-0.5 px-2 rounded-full ${
                      completed
                        ? 'bg-amber-400/10 text-amber-400'
                        : unlocked
                        ? 'bg-cyan-400/10 text-cyan-400 animate-pulse'
                        : 'bg-slate-900 text-slate-700'
                    }`}>
                      {module.category}
                    </span>
                    <span className="text-[10px] font-mono flex items-center space-x-1 text-slate-400">
                      <Flame className="w-3 h-3 text-amber-500" />
                      <span>+{module.rewardXp} XP</span>
                    </span>
                  </div>

                  <h3 className={`font-mono text-sm sm:text-base font-bold mt-1.5 truncate ${
                    unlocked ? 'text-slate-100' : 'text-slate-700'
                  }`}>
                    {module.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {module.subtitle} • <span className={`font-bold ${
                      module.difficulty === 'Beginner' ? 'text-emerald-400' :
                      module.difficulty === 'Intermediate' ? 'text-cyan-400' : 'text-purple-400'
                    }`}>{module.difficulty}</span>
                  </p>

                  {/* Indicator hover overlay */}
                  {unlocked && (
                    <div className="absolute top-2 right-2 flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-mono text-cyan-400">ENGAGE DATA</span>
                      <span className="text-cyan-400 text-xs">→</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
