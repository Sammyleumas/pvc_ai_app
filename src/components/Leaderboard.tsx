/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { RivalPlayer, CharacterClass } from '../types.ts';
import { Trophy, Search, Sparkles, SlidersHorizontal } from 'lucide-react';
import { soundManager } from '../utils/audio.ts';

interface LeaderboardProps {
  rivals: RivalPlayer[];
  currentUserTag: string;
}

export default function Leaderboard({ rivals, currentUserTag }: LeaderboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState<string>('All');

  // Sort players by total XP (descending)
  const sortedPlayers = [...rivals].sort((a, b) => b.xp - a.xp);

  // Filter players
  const filteredPlayers = sortedPlayers.filter(player => {
    const matchesSearch = player.gamerTag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'All' || player.characterClass === classFilter;
    return matchesSearch && matchesClass;
  });

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-xl">🏆 <span className="text-amber-400 font-bold font-mono">1ST</span></span>;
      case 2:
        return <span className="text-lg">🥈 <span className="text-slate-300 font-bold font-mono">2ND</span></span>;
      case 3:
        return <span className="text-base">🥉 <span className="text-amber-700 font-bold font-mono">3RD</span></span>;
      default:
        return <span className="text-slate-500 font-mono text-sm">#{rank}</span>;
    }
  };

  const getClassIcon = (charClass: CharacterClass) => {
    switch (charClass) {
      case 'Prompt Wizard': return '🔮';
      case 'Cyber Alchemist': return '🧪';
      case 'Pixel Engineer': return '📐';
      case 'Low-Code Rogue': return '🥷';
      default: return '👾';
    }
  };

  return (
    <div id="leaderboard-container" className="bg-[#080811] rounded-3xl border border-slate-900 overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-slate-100 flex items-center space-x-2">
            <Trophy className="w-6 h-6 text-amber-400 mr-1" />
            <span>GLOBAL LIVE LEADERBOARDS</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">
            Realtime competitor study index tracking PVC-AID candidates.
          </p>
        </div>
      </div>

      {/* Filter and search utilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="relative">
          <input
            id="leaderboard-search"
            type="text"
            placeholder="Search candidate tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111124] border border-blue-950 rounded-xl py-2 px-4 pl-10 text-xs sm:text-sm text-slate-300 font-mono placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
          />
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-600 pointer-events-none" />
        </div>

        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-600 shrink-0" />
          <select
            id="class-filter-select"
            value={classFilter}
            onChange={(e) => {
              soundManager.playClick();
              setClassFilter(e.target.value);
            }}
            className="w-full bg-[#111124] border border-blue-950 rounded-xl py-2 px-3 text-xs sm:text-sm text-slate-300 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500/50 cursor-pointer"
          >
            <option value="All">All Specializations</option>
            <option value="Prompt Wizard">Prompt Wizards</option>
            <option value="Cyber Alchemist">Cyber Alchemists</option>
            <option value="Pixel Engineer">Pixel Engineers</option>
            <option value="Low-Code Rogue">Low-Code Rogues</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table Grid */}
      <div className="flex-1 overflow-y-auto max-h-[380px] space-y-2 pr-1 custom-scrollbar">
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-12 text-slate-600 font-mono text-sm rounded-xl border border-dashed border-slate-900 bg-[#0d0d1b]/20">
            No active candidates matched your filters.
          </div>
        ) : (
          filteredPlayers.map((player, index) => {
            // Find true rank in master array before filters
            const masterRank = sortedPlayers.findIndex(p => p.id === player.id) + 1;
            const isSelf = player.gamerTag === currentUserTag;

            return (
              <motion.div
                id={`leaderboard-row-${player.gamerTag.replace(/\s+/g, '-').toLowerCase()}`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                key={player.id}
                className={`p-3.5 sm:px-5 flex items-center justify-between rounded-xl transition-all border ${
                  isSelf
                    ? 'bg-gradient-to-r from-blue-950/20 via-indigo-950/30 to-blue-950/25 border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.1)] relative'
                    : 'bg-[#0f0f22] border-blue-950/40 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  {/* Rank Display pointer */}
                  <div className="w-12 shrink-0 flex justify-center">
                    {getRankBadge(masterRank)}
                  </div>

                  {/* Character Avatar Emoji circle */}
                  <div className="relative shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-[#090914] border ${
                      isSelf ? 'border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.2)]' : 'border-slate-800'
                    }`}>
                      {player.avatarUrl}
                    </div>
                    {isSelf && (
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    )}
                  </div>

                  {/* Gamer Details */}
                  <div className="min-w-0">
                    <div className="flex items-center space-x-1.5">
                      <span className={`font-mono text-xs sm:text-sm font-bold truncate ${
                        isSelf ? 'text-teal-300' : 'text-slate-200'
                      }`}>
                        {player.gamerTag}
                      </span>
                      {isSelf && (
                        <span className="bg-cyan-400 text-[#090912] text-[8px] font-mono font-black py-0.5 px-1.5 rounded uppercase shrink-0 animate-pulse">
                          YOU
                        </span>
                      )}
                    </div>
                    
                    <div className="text-[10px] sm:text-xs text-slate-400 font-mono flex items-center space-x-1.5 mt-0.5">
                      <span>{getClassIcon(player.characterClass)}</span>
                      <span className="truncate">{player.characterClass}</span>
                      <span>•</span>
                      <span className="text-slate-500 uppercase tracking-widest text-[9px]">Lvl {player.level}</span>
                    </div>
                  </div>
                </div>

                {/* Score Indicators */}
                <div className="text-right shrink-0">
                  <div className={`font-mono text-xs sm:text-sm font-black ${
                    isSelf ? 'text-cyan-400' : 'text-teal-400'
                  }`}>
                    {player.xp.toLocaleString()} <span className="text-[9px] font-normal text-slate-500">XP</span>
                  </div>
                  <div className="text-[9px] font-mono text-slate-500 mt-0.5">
                    {Math.min(10, player.level)}/10 MODULES
                  </div>
                </div>

              </motion.div>
            );
          })
        )}
      </div>

      {/* Leaderboard status report footer */}
      <div className="border-t border-slate-900 mt-4 pt-3 text-center">
        <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono text-slate-500">
          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>REALTIME CANDIDATE MATCHMAKING INDEX ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
