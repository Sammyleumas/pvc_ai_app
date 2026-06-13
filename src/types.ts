/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CharacterClass = 'Prompt Wizard' | 'Cyber Alchemist' | 'Pixel Engineer' | 'Low-Code Rogue';

export interface PlayerProfile {
  gamerTag: string;
  avatarUrl: string;
  characterClass: CharacterClass;
  xp: number;
  level: number;
  completedModules: number[]; // Array of completed module IDs
  badges: string[];
  email?: string;
}

export interface RivalPlayer {
  id: string;
  gamerTag: string;
  avatarUrl: string;
  characterClass: CharacterClass;
  xp: number;
  level: number;
  isCurrentUser?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface TextbookSection {
  title: string;
  paragraphs: string[];
}

export interface StudyModule {
  id: number;
  levelNum: number;
  title: string;
  subtitle: string;
  category: string;
  objectives: string[];
  sections: TextbookSection[];
  practicalExercises: string[];
  assignment: {
    title: string;
    requirements: string[];
  };
  quiz: QuizQuestion;
  rewardXp: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAtXp: number;
}
