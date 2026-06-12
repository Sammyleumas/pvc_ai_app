/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { CharacterClass, PlayerProfile } from '../types.ts';
import { soundManager } from '../utils/audio.ts';
import { Shield, Sparkles, Terminal, Cpu } from 'lucide-react';

interface ProfileCreatorProps {
  onProfileCreated: (profile: PlayerProfile) => void;
}

const AVATARS = [
  { emoji: '🧙‍♂️', label: 'Sage' },
  { emoji: '🔮', label: 'Alchemist' },
  { emoji: '⚙️', label: 'Engineer' },
  { emoji: '🥷', label: 'Rogue' },
  { emoji: '👾', label: 'Pilot' },
  { emoji: '👑', label: 'Monarch' }
];

const CLASSES: Array<{
  name: CharacterClass;
  description: string;
  perk: string;
  icon: any;
  color: string;
  glow: string;
}> = [
  {
    name: 'Prompt Wizard',
    description: 'Bends generative LLMs to their absolute will with structured spells.',
    perk: 'Few-shot efficiency (+30% intelligence, faster content digesting)',
    icon: Sparkles,
    color: 'from-purple-600 to-indigo-600',
    glow: 'shadow-[0_0_20px_rgba(147,51,234,0.35)]Border-purple-500/30'
  },
  {
    name: 'Cyber Alchemist',
    description: 'Fuses disparate AI pipelines to manufacture gold out of complex data.',
    perk: 'Synthesis master (+25% learning rate, rapid multi-tool compare)',
    icon: Terminal,
    color: 'from-emerald-600 to-teal-600',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.35)] border-emerald-500/30'
  },
  {
    name: 'Pixel Engineer',
    description: 'Constructs custom, responsive layouts with exact typographic rhythm.',
    perk: 'Precision layout UI/UX (+35% design hierarchy insight)',
    icon: Cpu,
    color: 'from-cyan-600 to-blue-600',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.35)] border-cyan-500/30'
  },
  {
    name: 'Low-Code Rogue',
    description: 'Sprints through traditional hurdles using robust spreadsheet-databases.',
    perk: 'Rapid prototyping speed (+40% speed, bypass repetitive workflows)',
    icon: Shield,
    color: 'from-rose-600 to-amber-600',
    glow: 'shadow-[0_0_20px_rgba(244,63,94,0.35)] border-rose-500/30'
  }
];

export default function ProfileCreator({ onProfileCreated }: ProfileCreatorProps) {
  const [gamerTag, setGamerTag] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].emoji);
  const [selectedClass, setSelectedClass] = useState<CharacterClass>('Prompt Wizard');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (!gamerTag.trim()) {
      setErrorMessage('A gamer tag is required to register on the leaderboards.');
      soundManager.playFail();
      return;
    }
    if (gamerTag.length > 15) {
      setErrorMessage('Your tag must be 15 characters or less.');
      soundManager.playFail();
      return;
    }

    const defaultProfile: PlayerProfile = {
      gamerTag: gamerTag.trim(),
      avatarUrl: selectedAvatar,
      characterClass: selectedClass,
      xp: 0,
      level: 1,
      completedModules: [],
      badges: []
    };

    soundManager.playLevelUp();
    onProfileCreated(defaultProfile);
  };

  return (
    <div id="character-creator" className="min-h-screen bg-[#0a0a14] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.18),rgba(255,255,255,0))] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-[#111124] border border-blue-900/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-md relative overflow-hidden"
      >
        {/* Decorative Grid Mesh Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,16,16,0)_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none" />

        <div className="text-center relative z-10 mb-8">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-cyan-400 mb-3 animate-pulse">
            <span>READY TO SYNC: PVC-AID SIMULATOR v2.4</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
            Create Your Agent
          </h1>
          <p className="mt-2 text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
            Configure your technical specs to begin the Professional Vibe Coding Certification Trial.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          {/* Section 1: Name and Avatar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-semibold tracking-wide text-cyan-400 uppercase font-mono">
                Gamer Tag / Username
              </label>
              <input
                id="gamer-tag-input"
                type="text"
                placeholder="Enter elite tag..."
                value={gamerTag}
                onChange={(e) => {
                  setGamerTag(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full bg-[#0d0d19] border border-blue-900/60 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-100 font-mono placeholder-slate-600 transition-all text-lg"
              />
              {errorMessage && (
                <p className="text-rose-400 text-xs font-mono">{errorMessage}</p>
              )}

              {/* Avatar Grid */}
              <div className="pt-2">
                <label className="block text-sm font-semibold tracking-wide text-cyan-400 uppercase font-mono mb-3">
                  Select Visual Node (Avatar)
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {AVATARS.map((item) => (
                    <button
                      id={`avatar-btn-${item.emoji}`}
                      type="button"
                      key={item.emoji}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedAvatar(item.emoji);
                      }}
                      className={`h-12 flex items-center justify-center text-2xl rounded-xl transition-all cursor-pointer ${
                        selectedAvatar === item.emoji
                          ? 'bg-blue-600 relative after:absolute after:inset-0 after:rounded-xl after:ring-2 after:ring-cyan-300'
                          : 'bg-[#15152e] hover:bg-slate-800'
                      }`}
                    >
                      {item.emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Class Selection Preview card */}
            <div className="bg-[#0b0c16] rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest block mb-1">
                  Active Class Perks
                </span>
                <h3 className="text-2xl font-bold font-mono text-slate-100 flex items-center space-x-2">
                  <span>{selectedClass}</span>
                </h3>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {CLASSES.find((c) => c.name === selectedClass)?.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/80">
                <div className="text-xs font-mono text-slate-400 mb-1">UNLOCKED CLASS ATTRIBUTE:</div>
                <div className="text-amber-400 font-mono text-sm">
                  ⚡ {CLASSES.find((c) => c.name === selectedClass)?.perk}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Choose Class */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold tracking-wide text-cyan-400 uppercase font-mono">
              Choose Tech Specialization Class
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CLASSES.map((classItem) => {
                const IconComponent = classItem.icon;
                const isSelected = selectedClass === classItem.name;
                return (
                  <button
                    id={`class-btn-${classItem.name.replace(/\s+/g, '-').toLowerCase()}`}
                    type="button"
                    key={classItem.name}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedClass(classItem.name);
                    }}
                    className={`text-left p-5 rounded-2xl border transition-all relative overflow-hidden flex cursor-pointer ${
                      isSelected
                        ? `bg-slate-900 ${classItem.glow} border-t-2 border-r-blue-500`
                        : 'bg-[#0f0f22] border-blue-950/40 hover:border-blue-900/60'
                    }`}
                  >
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${classItem.color} text-white mr-4 self-start`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-lg text-slate-100 font-mono">{classItem.name}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {classItem.description}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-cyan-400 text-[#0a0a14] rounded-full text-[10px] font-bold">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              id="start-quest-btn"
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-indigo-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all font-mono tracking-wider flex items-center justify-center space-x-2 text-lg group cursor-pointer"
            >
              <span>INITIALIZE PROGRESSION CORE</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
