/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { StudyModule } from '../types.ts';
import { soundManager } from '../utils/audio.ts';
import { BookOpen, CheckSquare, Sparkles, AlertCircle, RefreshCw, ChevronLeft, Award, KeySquare } from 'lucide-react';

interface ModuleScreenProps {
  module: StudyModule;
  onBack: () => void;
  onCorrectSubmit: (xpAwarded: number) => void;
  isCompleted: boolean;
}

export default function ModuleScreen({ module, onBack, onCorrectSubmit, isCompleted }: ModuleScreenProps) {
  const [activeTab, setActiveTab] = useState<'study' | 'practical' | 'assignment' | 'quiz'>('study');
  
  // Quiz states
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(1);

  // Checkbox state for practical exercises to make it a living workbook
  const [checkedPracticals, setCheckedPracticals] = useState<Record<number, boolean>>({});

  const handleTogglePractical = (idx: number) => {
    soundManager.playClick();
    setCheckedPracticals(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleOptionSelect = (idx: number) => {
    if (isSubmitted) return; // Block selecting after lock-in
    soundManager.playClick();
    setSelectedOptionIdx(idx);
  };

  const handleQuizSubmit = () => {
    if (selectedOptionIdx === null) return;
    
    setIsSubmitted(true);
    const correct = selectedOptionIdx === module.quiz.correctAnswerIndex;
    setIsCorrect(correct);

    if (correct) {
      soundManager.playSuccess();
      onCorrectSubmit(module.rewardXp);
    } else {
      soundManager.playFail();
    }
  };

  const handleQuizRetry = () => {
    soundManager.playClick();
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setAttempts(a => a + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="bg-[#0b0c16] rounded-3xl border border-blue-950/60 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden text-slate-100"
    >
      {/* Top Banner Navigation Row */}
      <div className="bg-[#0e0f22] border-b border-blue-950 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <button
          id="back-map-btn"
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="inline-flex items-center space-x-1.5 font-mono text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/20 px-3 py-1.5 rounded-lg border border-cyan-800/30 self-start cursor-pointer transition-all"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>RETURN TO CAMPAIGN MAP</span>
        </button>

        <div className="flex items-center space-x-2 self-start sm:self-center">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/10">
            DIFF: {module.difficulty}
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
            CLASS XP: +{module.rewardXp}
          </span>
          {isCompleted && (
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>LEVEL CERTIFIED</span>
            </span>
          )}
        </div>
      </div>

      {/* Module Title Jumbotron */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-[#11122a] to-[#0b0c16] border-b border-blue-950/20 relative">
        <div className="absolute top-4 right-4 text-slate-900 font-mono text-7xl font-bold select-none opacity-10 pointer-events-none">
          L{module.levelNum}
        </div>
        
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block font-bold leading-none mb-1">
          {module.subtitle}
        </span>
        <h1 className="text-2xl sm:text-3.5xl font-mono font-black text-slate-100 mt-2 tracking-tight leading-tight">
          {module.title}
        </h1>
        
        {/* Objectives checklist block */}
        <div className="mt-4 p-4 bg-[#080811]/60 rounded-xl border border-blue-950/40">
          <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Level Learning Objectives:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {module.objectives.map((obj, i) => (
              <li key={i} className="flex items-start">
                <span className="text-cyan-400 mr-2 shrink-0">■</span>
                <span className="leading-normal">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Course Reader Tab selectors */}
      <div className="flex border-b border-blue-950 overflow-x-auto justify-start font-mono text-xs sm:text-sm">
        <button
          id="tab-study-btn"
          onClick={() => { soundManager.playClick(); setActiveTab('study'); }}
          className={`flex items-center space-x-2 py-4 px-5 shrink-0 select-none cursor-pointer border-b-2 transition-all ${
            activeTab === 'study' ? 'border-cyan-400 text-cyan-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>I. LESSON STUDY</span>
        </button>

        <button
          id="tab-practical-btn"
          onClick={() => { soundManager.playClick(); setActiveTab('practical'); }}
          className={`flex items-center space-x-2 py-4 px-5 shrink-0 select-none cursor-pointer border-b-2 transition-all ${
            activeTab === 'practical' ? 'border-cyan-400 text-cyan-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>II. PRACTICAL GUIDES</span>
        </button>

        <button
          id="tab-assignment-btn"
          onClick={() => { soundManager.playClick(); setActiveTab('assignment'); }}
          className={`flex items-center space-x-2 py-4 px-5 shrink-0 select-none cursor-pointer border-b-2 transition-all ${
            activeTab === 'assignment' ? 'border-cyan-400 text-cyan-400 bg-slate-900/50' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <KeySquare className="w-3.5 h-3.5" />
          <span>III. LAB ASSIGNMENT</span>
        </button>

        <button
          id="tab-quiz-btn"
          onClick={() => { soundManager.playClick(); setActiveTab('quiz'); }}
          className={`flex items-center space-x-2 py-4 px-5 shrink-0 select-none cursor-pointer border-b-2 transition-all ${
            activeTab === 'quiz' ? 'border-cyan-400 text-cyan-400 bg-cyan-950/10' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>IV. CERTIFICATION TEST</span>
        </button>
      </div>

      {/* Active Tab Screen Area */}
      <div className="p-6 sm:p-8 min-h-[300px]">
        
        {/* Tab I: Study Content */}
        {activeTab === 'study' && (
          <div id="study-tab-content" className="space-y-6">
            {module.sections.map((sec, i) => (
              <div key={i} className="prose max-w-none space-y-3.5">
                <h3 className="font-mono text-base sm:text-lg font-bold text-cyan-300 flex items-center space-x-2">
                  <span className="text-[#3b82f6]">0{i + 1}.</span>
                  <span>{sec.title}</span>
                </h3>
                {sec.paragraphs.map((p, j) => (
                  <p key={j} className="text-slate-300 text-sm sm:text-base leading-relaxed tracking-wide">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Tab II: Practical Guides */}
        {activeTab === 'practical' && (
          <div id="practical-tab-content" className="space-y-6">
            <div className="bg-slate-950/40 border border-blue-950 p-4 rounded-xl">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                IMMERSIVE WORKBOOK LAB
              </span>
              <p className="text-xs text-slate-400">
                Tick off each dynamic workbook step as you run and explore them in your playground code workspace.
              </p>
            </div>

            <div className="space-y-3">
              {module.practicalExercises.map((exercise, i) => {
                const isChecked = !!checkedPracticals[i];
                return (
                  <button
                    id={`practical-task-${i}`}
                    key={i}
                    onClick={() => handleTogglePractical(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start cursor-pointer ${
                      isChecked
                        ? 'bg-blue-950/15 border-cyan-500/30 text-slate-300'
                        : 'bg-[#111124]/40 border-slate-900/60 hover:border-slate-800 text-slate-100 animate-none'
                    }`}
                  >
                    <div className={`w-5.5 h-5.5 shrink-0 rounded border flex items-center justify-center mr-3.5 mt-0.5 transition-all ${
                      isChecked ? 'bg-cyan-500 border-cyan-400 text-[#090912]' : 'border-slate-700 bg-slate-950/50'
                    }`}>
                      {isChecked && <span className="text-xs font-bold font-sans">✓</span>}
                    </div>
                    <div>
                      <div className="font-mono text-xs font-bold text-cyan-400 mb-1">PRACTICAL STEP 0{i + 1}</div>
                      <p className="text-xs sm:text-sm font-sans text-slate-300 leading-normal">{exercise}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab III: Assignments */}
        {activeTab === 'assignment' && (
          <div id="assignment-tab-content" className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#12122b] to-[#10101e] border border-blue-950">
              <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-widest block mb-1">
                CERTIFICATE LAB ASSIGNMENT
              </span>
              <h3 className="text-lg font-mono font-bold text-slate-100 mb-3">
                {module.assignment.title}
              </h3>
              
              <div className="space-y-4 pt-2 border-t border-blue-950/30">
                <div className="text-xs font-mono text-slate-400">SPECIFICATION CHECKLIST:</div>
                <div className="grid grid-cols-1 gap-2.5">
                  {module.assignment.requirements.map((req, idx) => (
                    <div key={idx} className="flex items-start text-xs sm:text-sm text-slate-300">
                      <span className="text-[#a855f7] mr-2.5 shrink-0">⚔</span>
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab IV: Certification Quiz (Gating questionnaire) */}
        {activeTab === 'quiz' && (
          <div id="quiz-tab-content" className="space-y-6">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm uppercase">
              <span>SIMULATED EXAM CONTROL</span>
            </div>

            <div className="p-5 sm:p-6 bg-slate-950/40 border border-blue-950/60 rounded-2xl">
              <span className="text-xs font-mono text-slate-500 block mb-1">QUESTION :</span>
              <h3 className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed font-sans">
                {module.quiz.question}
              </h3>
            </div>

            {/* Answer option nodes list */}
            <div className="grid grid-cols-1 gap-3.5">
              {module.quiz.options.map((option, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const showSuccessStyle = isSubmitted && idx === module.quiz.correctAnswerIndex;
                const showWrongStyle = isSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    id={`quiz-option-${idx}`}
                    disabled={isSubmitted}
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all font-sans text-xs sm:text-sm relative cursor-pointer ${
                      showSuccessStyle
                        ? 'bg-emerald-950/15 border-emerald-500 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                        : showWrongStyle
                        ? 'bg-rose-950/15 border-rose-500 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.1)] animate-shake'
                        : isSelected
                        ? 'bg-blue-950/30 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/20'
                        : isSubmitted
                        ? 'bg-[#111124]/10 border-slate-950 opacity-40 text-slate-600 cursor-not-allowed'
                        : 'bg-[#111124]/40 border-blue-950/45 hover:border-blue-900/40 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold mr-3.5 shrink-0 ${
                        showSuccessStyle
                          ? 'bg-emerald-500 text-[#090912]'
                          : showWrongStyle
                          ? 'bg-rose-500 text-[#090912]'
                          : isSelected
                          ? 'bg-cyan-400 text-[#090912]'
                          : 'bg-slate-950 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1 leading-normal">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Evaluation Action Footer Panel */}
            <div className="pt-4 border-t border-slate-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              
              {!isSubmitted ? (
                <>
                  <p className="text-xs font-mono text-slate-500">
                    ⚠ Answer correctly first to establish certification credentials and unlock Level {module.levelNum + 1}.
                  </p>
                  <button
                    id="submit-quiz-btn"
                    disabled={selectedOptionIdx === null}
                    onClick={handleQuizSubmit}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-mono font-bold text-xs shrink-0 tracking-wider transition-all cursor-pointer ${
                      selectedOptionIdx !== null
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md'
                        : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    LOCK IN DECISION
                  </button>
                </>
              ) : (
                <div className="w-full space-y-4">
                  {isCorrect ? (
                    <div className="p-4 px-5 rounded-xl bg-emerald-950/15 border border-emerald-500/20 text-emerald-400 flex items-start gap-3.5 shadow-[0_0_15px_rgba(16,185,129,0.02)]">
                      <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-mono text-sm font-bold text-slate-100">SIMULATOR MATCH COMPLETED (EXCELLENT)</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {module.quiz.explanation}
                        </p>
                        <p className="text-xs text-cyan-400 font-mono mt-3 uppercase tracking-wide">
                          🎉 {module.rewardXp} XP successfully synchronized to your campaign node matrix.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      <div className="p-4 px-5 rounded-xl bg-rose-950/15 border border-rose-500/20 text-rose-400 flex items-start gap-3.5">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-mono text-sm font-bold text-slate-100">SIMULATION MISALIGNMENT DETECTED</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            Your conceptual calculation was slightly off-bounds. Try researching the workbook data blocks.
                          </p>
                        </div>
                      </div>

                      <button
                        id="retry-quiz-btn"
                        onClick={handleQuizRetry}
                        className="inline-flex items-center space-x-1.5 font-mono text-xs bg-[#121226] hover:bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-lg text-slate-200 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>RE-CALIBRATE EXPERIMENT (TRY AGAIN)</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
