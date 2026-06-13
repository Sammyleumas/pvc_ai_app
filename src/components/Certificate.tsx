/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PlayerProfile } from '../types.ts';
import { soundManager } from '../utils/audio.ts';
import { X, Printer, Award, FileBadge, ShieldCheck, Sparkles, Calendar, UserCheck } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CertificateProps {
  profile: PlayerProfile;
  onClose: () => void;
}

export default function Certificate({ profile, onClose }: CertificateProps) {
  const [certId, setCertId] = useState('');
  const [issueDate, setIssueDate] = useState('');

  useEffect(() => {
    // Generate a consistent, unique-looking cert hash sequence based on player attributes
    const nameSeed = (profile.gamerTag || 'agent').toUpperCase();
    const classSeed = (profile.characterClass || 'pilot').toUpperCase().replace(' ', '');
    const timestampSeed = new Date().getTime().toString(16).toUpperCase().slice(-5);
    const generatedId = `PVC-${nameSeed.slice(0, 3)}-${classSeed.slice(0, 3)}-${timestampSeed}`;
    setCertId(generatedId);

    // Format current human-friendly date
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    setIssueDate(new Date().toLocaleDateString('en-US', dateOptions));
  }, [profile]);

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div id="certificate-overlay" className="fixed inset-0 z-50 bg-[#040409]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:relative print:z-0 print:inset-auto">
      
      {/* Absolute background accent lights - Hidden on print */}
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-indigo-500/10 via-cyan-500/5 to-transparent pointer-events-none rounded-full blur-[120px] print:hidden" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-purple-600/10 pointer-events-none rounded-full blur-[100px] print:hidden" />

      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* Actions bar above container - Hidden on print */}
        <div className="w-full flex items-center justify-between mb-4 print:hidden px-2">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 tracking-wider">SECURE DIGITAL CREDENTIAL SECURED</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              id="cert-print-btn"
              onClick={handlePrint}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-mono text-xs font-medium px-4 py-2 rounded-xl border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT CREDENTIAL</span>
            </button>
            
            <button
              id="cert-close-btn"
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white p-2 rounded-xl transition-all cursor-pointer"
              title="Close Certificate View"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Primary Canvas Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-[#101026] border-2 border-indigo-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.15)] print:border-slate-800 print:text-black print:bg-white print:shadow-none print:p-8 print:rounded-none"
        >
          {/* Neon inner laser borders */}
          <div className="absolute inset-3 border border-indigo-500/10 rounded-2xl pointer-events-none print:border-slate-300" />
          <div className="absolute inset-4 border border-cyan-500/5 rounded-2xl pointer-events-none print:hidden" />

          {/* Decorative Corner Cyber brackets */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40 pointer-events-none print:hidden" />
          <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 pointer-events-none print:hidden" />
          <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-indigo-400/40 pointer-events-none print:hidden" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-indigo-400/40 pointer-events-none print:hidden" />

          {/* Subtle Technical Mesh overlay - Disabled for print */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none print:hidden" />

          {/* Cert Content Body */}
          <div className="relative z-10 text-center flex flex-col items-center">
            
            {/* Header Crest Logo */}
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-cyan-500/20 mb-6 shadow-[0_0_20px_rgba(6,182,212,0.1)] print:border-slate-500 print:bg-slate-100 print:shadow-none">
              <Award className="w-10 h-10 text-cyan-400 print:text-indigo-900" />
            </div>

            {/* Title Block */}
            <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 font-black uppercase mb-1.5 print:text-slate-600">
              SL-TECHCO SIMULATOR NETWORKS
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-indigo-200 to-cyan-300 print:text-slate-900 print:bg-none">
              CERTIFICATE OF COMPLETION
            </h1>
            <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent my-4 print:bg-slate-400 print:h-[1px]" />

            {/* Presentation Statement */}
            <p className="font-mono text-xs text-slate-400 tracking-wider mb-6 print:text-slate-600">
              THIS OFFICIAL DIPLOMA CERTIFIES THAT THE CANDIDATE ASSOCIATED WITH
            </p>

            {/* Recipient Details Card */}
            <div className="bg-[#0b0b1a] border border-blue-900/40 px-6 py-4 rounded-2xl max-w-lg w-full mb-6 print:bg-slate-50 print:border-slate-300">
              <span className="text-[9px] font-mono text-indigo-400 uppercase tracking-widest block mb-1">
                VERIFIED STUDY PARTICIPANT EMAIL
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-amber-400 print:text-slate-900">
                {profile.email || 'abiodunsamuel112@gmail.com'}
              </div>
              
              <div className="mt-2 text-xs font-mono text-slate-400 flex items-center justify-center space-x-1">
                <span>Ranked Alias:</span>
                <span className="text-slate-200 font-bold font-sans">{profile.gamerTag}</span>
                <span className="text-slate-600">•</span>
                <span>Specialization:</span>
                <span className="text-cyan-400 font-bold">{profile.characterClass}</span>
              </div>
            </div>

            {/* Achievements Statement */}
            <p className="max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed tracking-wide mb-8 print:text-slate-700">
              has successfully cleared all 10 simulation modules of the <span className="text-cyan-400 font-bold font-mono print:text-indigo-900">PVC-AID Certification Trial</span>, demonstrating master-grade performance, structured prompt generation, rapid tool deployment, and correct response validation under constraints.
            </p>

            {/* Multi-Badge Grid for Visual Reward */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0d0d21] border border-blue-900/20 p-4 rounded-xl mb-8 w-full max-w-2xl print:hidden">
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-indigo-400 mb-1" />
                <span className="text-[9px] font-mono text-slate-400">PROMPT SPELLS</span>
                <span className="text-[8px] font-mono text-cyan-400 font-bold uppercase">MASTERED</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <FileBadge className="w-5 h-5 text-emerald-400 mb-1" />
                <span className="text-[9px] font-mono text-slate-400">UI CONTRAST</span>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase">PASSED</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
                <span className="text-[9px] font-mono text-slate-400">10 LEVEL QUEST</span>
                <span className="text-[8px] font-mono text-amber-400 font-bold uppercase">100% DONE</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-900/50 border border-slate-800">
                <UserCheck className="w-5 h-5 text-pink-400 mb-1" />
                <span className="text-[9px] font-mono text-slate-400">LEADERBOARD</span>
                <span className="text-[8px] font-mono text-pink-400 font-bold uppercase">SYNCED</span>
              </div>
            </div>

            {/* Signatures & Certification details */}
            <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-indigo-950/40 max-w-2xl text-left print:border-slate-300">
              
              {/* Date Column */}
              <div className="space-y-1 font-mono text-[10px] text-slate-500">
                <div className="flex items-center space-x-1.5 mb-1 text-slate-400 print:text-black">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-bold">VERIFICATION DETAILS</span>
                </div>
                <div>DATE SECURED: <span className="text-slate-300 font-medium print:text-slate-800">{issueDate}</span></div>
                <div>VERIFIED STATUS: <span className="text-emerald-400 font-bold uppercase">CRYPTOGRAPHICALLY APPROVED</span></div>
                <div>EXPIRE: <span className="text-slate-400">NEVER LIMITLESS LIFE</span></div>
              </div>

              {/* Signatures graphics */}
              <div className="flex space-x-8">
                {/* Director Core stamp */}
                <div className="flex flex-col items-center text-center">
                  <div className="font-serif italic text-cyan-300 text-sm tracking-wide mb-1 select-none print:text-indigo-900">
                    AI-Studio-Core-2.4
                  </div>
                  <div className="h-[1px] w-28 bg-slate-800 my-1" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">SI CORE EVALUATOR</span>
                </div>

                {/* SL-Techco Lead Evaluator */}
                <div className="flex flex-col items-center text-center">
                  <div className="font-serif italic text-indigo-300 text-sm tracking-wide mb-1 font-bold select-none print:text-indigo-900">
                    SL-VibeTech-Node
                  </div>
                  <div className="h-[1px] w-28 bg-slate-800 my-1" />
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">LEAD AUDITOR</span>
                </div>
              </div>

            </div>

            {/* Cryptographic ID foot marker */}
            <div className="mt-8 pt-4 w-full text-center border-t border-indigo-950/20">
              <div className="text-[9px] font-mono text-slate-600 tracking-wider">
                CERTIFICATE ID: {certId} • SECURITY VERIFIED THROUGH SHA-256 SIMULATION INTEGRITY
              </div>
            </div>

          </div>

        </motion.div>

        {/* Informative notification - Hidden on print */}
        <p className="text-[10px] font-mono text-slate-500 mt-3 text-center tracking-wide print:hidden">
          💡 Pro-Tip: Printing this page lets you save it as a high-quality physical or digital PDF document natively!
        </p>

      </div>
    </div>
  );
}
