/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PlayerProfile, RivalPlayer, StudyModule } from './types.ts';
import { STUDY_MODULES } from './modulesData.ts';
import ProfileCreator from './components/ProfileCreator.tsx';
import QuestMap from './components/QuestMap.tsx';
import Leaderboard from './components/Leaderboard.tsx';
import ModuleScreen from './components/ModuleScreen.tsx';
import GameHUD from './components/GameHUD.tsx';
import ParticleExplosion from './components/ParticleExplosion.tsx';
import { Sparkles, GraduationCap, Flame, Award } from 'lucide-react';

const LOCAL_STORAGE_PROFILE_KEY = 'pvcaid_player_profile_v2';
const LOCAL_STORAGE_RIVALS_KEY = 'pvcaid_leaderboard_rivals_v2';

const SEED_RIVALS: RivalPlayer[] = [
  { id: 'r1', gamerTag: 'SyntaxSlayer', avatarUrl: '🥷', characterClass: 'Low-Code Rogue', xp: 1220, level: 6 },
  { id: 'r2', gamerTag: 'PromptSquire', avatarUrl: '🧙‍♂️', characterClass: 'Prompt Wizard', xp: 850, level: 4 },
  { id: 'r3', gamerTag: 'AI_Overlord', avatarUrl: '👾', characterClass: 'Cyber Alchemist', xp: 1450, level: 7 },
  { id: 'r4', gamerTag: 'CursorKnight', avatarUrl: '⚙️', characterClass: 'Pixel Engineer', xp: 980, level: 5 },
  { id: 'r5', gamerTag: 'DebugRanger', avatarUrl: '💻', characterClass: 'Pixel Engineer', xp: 450, level: 2 },
  { id: 'r6', gamerTag: 'NoCodeDuchess', avatarUrl: '👑', characterClass: 'Low-Code Rogue', xp: 620, level: 3 },
  { id: 'r7', gamerTag: 'SaaSPioneer', avatarUrl: '🛡️', characterClass: 'Cyber Alchemist', xp: 150, level: 1 },
  { id: 'r8', gamerTag: 'CodeCaster', avatarUrl: '🔮', characterClass: 'Prompt Wizard', xp: 300, level: 2 },
  { id: 'r9', gamerTag: 'PixelGenie', avatarUrl: '🎨', characterClass: 'Pixel Engineer', xp: 380, level: 2 },
  { id: 'r10', gamerTag: 'GitCommander', avatarUrl: '📂', characterClass: 'Low-Code Rogue', xp: 1680, level: 8 }
];

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [rivals, setRivals] = useState<RivalPlayer[]>([]);
  const [selectedModule, setSelectedModule] = useState<StudyModule | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  // Load persistence state on mount
  useEffect(() => {
    const rawProfile = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
    const rawRivals = localStorage.getItem(LOCAL_STORAGE_RIVALS_KEY);

    if (rawProfile) {
      setProfile(JSON.parse(rawProfile));
    }
    
    if (rawRivals) {
      setRivals(JSON.parse(rawRivals));
    } else {
      setRivals(SEED_RIVALS);
      localStorage.setItem(LOCAL_STORAGE_RIVALS_KEY, JSON.stringify(SEED_RIVALS));
    }

    setAppLoading(false);
  }, []);

  // Update profile and rivals leaderboard when profile changes
  const saveProfileState = (newProfile: PlayerProfile) => {
    setProfile(newProfile);
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(newProfile));
  };

  const handleProfileCreated = (initialProfile: PlayerProfile) => {
    saveProfileState(initialProfile);

    // Synchronize current user into competitors list
    const userAsRival: RivalPlayer = {
      id: 'current_user',
      gamerTag: initialProfile.gamerTag,
      avatarUrl: initialProfile.avatarUrl,
      characterClass: initialProfile.characterClass,
      xp: initialProfile.xp,
      level: initialProfile.level,
      isCurrentUser: true
    };

    const currentRivals = rivals.length > 0 ? rivals : SEED_RIVALS;
    const cleanRivals = currentRivals.filter(r => r.id !== 'current_user');
    const updatedRivals = [...cleanRivals, userAsRival];
    setRivals(updatedRivals);
    localStorage.setItem(LOCAL_STORAGE_RIVALS_KEY, JSON.stringify(updatedRivals));
  };

  // Evaluated correct answer callback
  const handleCorrectAnswer = (xpAwarded: number) => {
    if (!profile || !selectedModule) return;

    // Check if module is already completed
    const isAlreadyCompleted = profile.completedModules.includes(selectedModule.id);
    
    let updatedCompleted = [...profile.completedModules];
    let newXp = profile.xp;
    
    if (!isAlreadyCompleted) {
      updatedCompleted.push(selectedModule.id);
      newXp = profile.xp + xpAwarded;
    }

    // Badge unlocked check
    const newBadges = [...profile.badges];
    if (updatedCompleted.length >= 1 && !newBadges.includes('Novice Core')) {
      newBadges.push('Novice Core');
    }
    if (updatedCompleted.length >= 3 && !newBadges.includes('Prompt Specialist')) {
      newBadges.push('Prompt Specialist');
    }
    if (updatedCompleted.length >= 6 && !newBadges.includes('Architect Adept')) {
      newBadges.push('Architect Adept');
    }
    if (updatedCompleted.length === STUDY_MODULES.length && !newBadges.includes('Vibe Grandmaster')) {
      newBadges.push('Vibe Grandmaster');
    }

    const calculatedLevel = Math.floor(newXp / 200) + 1;

    const updatedProfile: PlayerProfile = {
      ...profile,
      xp: newXp,
      level: calculatedLevel,
      completedModules: updatedCompleted,
      badges: newBadges
    };

    saveProfileState(updatedProfile);

    // Active particle blowout
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
    }, 4500);

    // Update current user item on the rivals board + trigger dynamic rival progress
    const updatedRivals = rivals.map(r => {
      if (r.id === 'current_user') {
        return {
          ...r,
          xp: newXp,
          level: calculatedLevel,
          gamerTag: profile.gamerTag,
          avatarUrl: profile.avatarUrl
        };
      }
      
      // Simulate dynamic candidate rival progress (only trigger for uncompleted nodes)
      // Gives a 35% chance per candidate to gain a tiny XP score (mimics concurrent studying)
      if (!isAlreadyCompleted && Math.random() < 0.35) {
        const rivalBoost = Math.floor(Math.random() * 90) + 40;
        const nextXp = r.xp + rivalBoost;
        return {
          ...r,
          xp: nextXp,
          level: Math.floor(nextXp / 200) + 1
        };
      }
      return r;
    });

    setRivals(updatedRivals);
    localStorage.setItem(LOCAL_STORAGE_RIVALS_KEY, JSON.stringify(updatedRivals));
  };

  const handleWipeProfile = () => {
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_RIVALS_KEY);
    setProfile(null);
    setRivals(SEED_RIVALS);
    setSelectedModule(null);
  };

  // Calculate current rankings
  const getLeaderboardRank = () => {
    if (!profile) return 11;
    const sorted = [...rivals].sort((a, b) => b.xp - a.xp);
    const selfIdx = sorted.findIndex(r => r.id === 'current_user' || r.gamerTag === profile.gamerTag);
    return selfIdx !== -1 ? selfIdx + 1 : 11;
  };

  if (appLoading) {
    return (
      <div className="min-h-screen bg-[#070710] flex items-center justify-center font-mono text-cyan-400">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="animate-pulse text-xs tracking-wider">SYNCING CERTIFICATION DATABASE...</p>
        </div>
      </div>
    );
  }

  // If no profile setup exists, default directly to Character creator
  if (!profile) {
    return (
      <ProfileCreator onProfileCreated={handleProfileCreated} />
    );
  }

  const overallCompletedCount = profile.completedModules.length;
  const overallPercent = Math.round((overallCompletedCount / STUDY_MODULES.length) * 100);

  return (
    <div id="pvc-aid-app-root" className="min-h-screen bg-[#05050b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))] text-slate-100 flex flex-col justify-between font-sans relative pb-12 select-none">
      
      {/* Dynamic Laser Firework Particles */}
      {isExploding && <ParticleExplosion />}

      {/* Retro background vertical laser grids */}
      <div className="absolute top-0 inset-0 bg-[linear-gradient(rgba(18,16,16,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,16,16,0)_1px,transparent_1px)] bg-[size:35px_35px] opacity-[0.03] pointer-events-none" />

      {/* Header title bar */}
      <header className="border-b border-blue-950/40 bg-[#070713]/80 backdrop-blur-md relative z-10 p-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <GraduationCap className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 uppercase tracking-tight">
                  PVC-AID QUEST
                </h1>
                <span className="bg-amber-400 text-[#090912] text-[9px] font-mono font-black py-0.5 px-1.5 rounded uppercase transform rotate-2">
                  LEVEL MAP
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 tracking-wider">
                Professional Vibe Coding &amp; AI Development Certification
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 self-start sm:self-center">
            {/* Quick badges row */}
            <div className="hidden sm:flex items-center space-x-1.5 bg-[#0a0a14] border border-blue-950 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-400">
              <Award className="w-4 h-4 text-amber-500 mr-1" />
              <span>BADGES UNLOCKED: </span>
              <span className="text-amber-400 font-bold">{profile.badges.length}</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-[#0a0a14] border border-blue-950 px-3.5 py-1.5 rounded-xl text-xs font-mono">
              <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-slate-400">XP:</span>
              <span className="text-cyan-400 font-bold">{profile.xp.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Campaign Canvas viewport */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-start">
        
        {/* Left Side: Game HUD and active Study Board/Quest Map */}
        <div id="quest-area-col" className="lg:col-span-2 space-y-8">
          
          {/* Top Status HUD widget */}
          <GameHUD
            profile={profile}
            completedPercent={overallPercent}
            currentRank={getLeaderboardRank()}
            onReset={handleWipeProfile}
          />

          <AnimatePresence mode="wait">
            {selectedModule ? (
              /* Textbook study level workspace panel */
              <div key="module-screen">
                <ModuleScreen
                  module={selectedModule}
                  onBack={() => {
                    setSelectedModule(null);
                    // Sync rivals to keep rank state accurate
                    localStorage.setItem(LOCAL_STORAGE_RIVALS_KEY, JSON.stringify(rivals));
                  }}
                  onCorrectSubmit={handleCorrectAnswer}
                  isCompleted={profile.completedModules.includes(selectedModule.id)}
                />
              </div>
            ) : (
              /* Campaign quest trails map nodes view */
              <div key="quest-map">
                <QuestMap
                  modules={STUDY_MODULES}
                  completedModules={profile.completedModules}
                  onSelectModule={(mod) => setSelectedModule(mod)}
                  currentXp={profile.xp}
                />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Competitors Leaderboard Panel */}
        <div id="leaderboard-area-col" className="h-full">
          <Leaderboard
            rivals={rivals}
            currentUserTag={profile.gamerTag}
          />
        </div>

      </main>

      {/* Certificate footer report */}
      <footer className="mt-8 border-t border-blue-950/30 text-center py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] font-mono text-slate-500 gap-3">
          <div>
            SL-TECHCO PVC-AID CERTIFICATION ENGINE • CERTIFICATE PVC-AID-2026
          </div>
          <div className="flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>LEVEL SIMULATION PROTOCOL VERIFIED IN THE CLOUD RUN PLATFORM</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
