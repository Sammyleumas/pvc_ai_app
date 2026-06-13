/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayerProfile, Achievement } from '../types.ts';
import { soundManager } from '../utils/audio.ts';
import { Award, Volume2, VolumeX, Sparkles, X, Swords } from 'lucide-react';
import { ACHIEVEMENTS } from '../modulesData.ts';

interface GameHUDProps {
  profile: PlayerProfile;
  completedPercent: number;
  currentRank: number;
  onReset: () => void;
  onShowCertificate: () => void;
}

export default function GameHUD({ profile, completedPercent, currentRank, onReset, onShowCertificate }: GameHUDProps) {
  const [isMuted, setIsMuted] = useState(soundManager.isMuted());
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);

  const handleToggleMute = () => {
    const mutedState = soundManager.toggleMute();
    setIsMuted(mutedState);
  };

  const currentLevel = Math.floor(profile.xp / 200) + 1;

  const getClassColor = (cClass: string) => {
    switch (cClass) {
      case 'Prompt Wizard': return 'text-purple-400 bg-purple-950/20 border-purple-900/35';
      case 'Cyber Alchemist': return 'text-emerald-400 bg-emerald-950/20 border-emerald-900/35';
      case 'Pixel Engineer': return 'text-cyan-400 bg-cyan-950/20 border-cyan-900/35';
      case 'Low-Code Rogue': return 'text-rose-400 bg-rose-950/20 border-rose-900/35';
      default: return 'text-slate-400 bg-slate-950 border-slate-900/35';
    }
  };

  return (
    <div id="game-hud-container" className="bg-[#111124] border border-blue-900/40 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
      {/* HUD Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left Col: Avatar & Character Spec */}
        <div className="flex items-center space-x-4">
          <div className="relative shrink-0 flex items-center justify-center">
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md scale-110 animate-pulse" />
            <div className="w-16 h-16 rounded-full bg-[#090914] border-2 border-cyan-500 flex items-center justify-center text-3.5xl relative z-10 shadow-lg">
              {profile.avatarUrl}
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-mono text-lg font-black text-slate-100 tracking-tight">
                {profile.gamerTag}
              </h3>
              <span className={`text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 border rounded-full ${getClassColor(profile.characterClass)}`}>
                {profile.characterClass}
              </span>
            </div>

            <div className="flex items-center space-x-2 mt-1 font-mono text-xs text-slate-400">
              <span className="text-amber-400 font-bold">LEVEL {currentLevel}</span>
              <span>•</span>
              <span className="flex items-center text-cyan-400">
                <Swords className="w-3.5 h-3.5 mr-1" />
                <span>RANK #{currentRank}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center Col: XP gauge tracker bar */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">CYBER METRICS ARCHIVE</span>
            <span className="text-cyan-400 font-bold">{profile.xp.toLocaleString()} <span className="text-slate-500 text-[10px]/none font-normal">XP</span></span>
          </div>

          <div className="h-2.5 w-full bg-[#090914] rounded-full overflow-hidden border border-slate-900">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (profile.xp / 2220) * 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>START TRIAL</span>
            <span>PVC-AID OVERALL COMPLETION: {completedPercent}%</span>
          </div>
        </div>

        {/* Right Col: Menu action triggers controls */}
        <div className="flex items-center justify-start md:justify-end gap-3 flex-wrap">
          
          {/* Certificate Toggle button */}
          {completedPercent === 100 ? (
            <button
              id="certificate-claim-hud-btn"
              onClick={() => {
                soundManager.playClick();
                onShowCertificate();
              }}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 border border-yellow-400 text-[#090912] px-4 py-2 rounded-xl text-xs font-mono font-black shadow-[0_0_20px_rgba(245,158,11,0.45)] hover:shadow-[0_0_25px_rgba(245,158,11,0.65)] hover:scale-105 cursor-pointer transition-all"
            >
              <span>🎓 CLAIM CERTIFICATE</span>
            </button>
          ) : (
            <button
              id="certificate-locked-hud-btn"
              disabled
              title="Unlock all 10 modules in the Quest Map to claim official graduation credentials!"
              className="flex items-center space-x-1.5 bg-[#0e0e1a] border border-slate-900 px-4 py-2 rounded-xl text-xs font-mono text-slate-500 opacity-70 cursor-not-allowed"
            >
              <span>🔒 CERTIFICATE ({profile.completedModules.length}/10)</span>
            </button>
          )}

          {/* Achievements modal button */}
          <button
            id="achievements-btn"
            onClick={() => {
              soundManager.playClick();
              setShowAchievementsModal(true);
            }}
            className="flex items-center space-x-1.5 bg-[#171735]/60 hover:bg-[#1a1a3e] border border-blue-950 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 hover:text-white cursor-pointer transition-all"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>ACHIEVEMENTS</span>
          </button>

          {/* Sound control button */}
          <button
            id="mute-toggle-btn"
            onClick={handleToggleMute}
            className="bg-[#171735]/60 hover:bg-[#1a1a3e] border border-blue-950 p-2.5 rounded-xl text-slate-300 hover:text-white cursor-pointer transition-all shrink-0"
            title={isMuted ? "Unmute Sounds" : "Mute Sounds"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Wipe profile reset button */}
          <button
            id="reset-profile-btn"
            onClick={() => {
              if (confirm("Permanently wipe simulation states and reset candidate tag?")) {
                soundManager.playClick();
                onReset();
              }
            }}
            className="text-[10px] font-mono text-slate-600 hover:text-rose-400 transition-colors uppercase cursor-pointer"
          >
            Reset Sync
          </button>

        </div>

      </div>

      {/* Pop-up Achievements Checklist Modal */}
      <AnimatePresence>
        {showAchievementsModal && (
          <div className="fixed inset-0 z-50 bg-[#05050b]/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111124] border border-blue-900/60 rounded-3xl p-6 max-w-md w-full shadow-2xl relative"
            >
              <button
                id="close-achievements-btn"
                onClick={() => {
                  soundManager.playClick();
                  setShowAchievementsModal(false);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-5 flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-mono text-slate-100">PROMETHEUS TROPHY ARCHIVE</h3>
              </div>

              <div className="space-y-3 pb-2 custom-scrollbar max-h-[350px] overflow-y-auto">
                {ACHIEVEMENTS.map((ach) => {
                  const unlocked = profile.xp >= ach.unlockedAtXp;
                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-xl border flex items-center justify-between ${
                        unlocked
                          ? 'bg-gradient-to-br from-[#1b193d] to-[#121226]/50 border-amber-500/20 text-slate-100'
                          : 'bg-[#0b0c16]/70 border-slate-950 opacity-45'
                      }`}
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="text-2.5xl">{ach.icon}</div>
                        <div>
                          <div className={`font-mono text-sm font-bold ${unlocked ? 'text-amber-300' : 'text-slate-600'}`}>
                            {ach.title}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{ach.description}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        {unlocked ? (
                          <div className="text-[9px] font-mono font-bold bg-amber-400/15 border border-amber-500/10 text-amber-400 py-0.5 px-2 rounded-full uppercase shrink-0">
                            UNLOCKED
                          </div>
                        ) : (
                          <div className="text-[9px] font-mono text-slate-600 uppercase">
                            {ach.unlockedAtXp} XP Needed
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
