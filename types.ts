import { LucideIcon } from 'lucide-react';

export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface TopicItem {
  id: string;
  title: string;
  url: string; 
  type: 'video' | 'doc' | 'course' | 'lab';
}

export interface ProjectSpec {
  id: string;
  title: string;
  description: string;
  tasks: string[];
  templateUrl?: string;
  rubric: string[];
}

export interface RoadmapPhase {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  topics: TopicItem[];
  tools: string[];
  project?: ProjectSpec;
  color: string;
  estimatedHours: number;
  prerequisites: string[];
}

export interface JourneyStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
  focusArea: string;
  targetTab: string;
}

export interface Resource {
  title: string;
  category: string;
  url: string;
  description: string;
  isFree: boolean;
  tags: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  description: string;
  command?: string;
  iconName?: string;
  url?: string;
}

export interface SkillItem {
  skill: string;
  level: 'Must Have' | 'Good to Have';
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  weight: { beginner: number; pro: number };
}

export interface UserProgress {
  completedTopics: string[];
  completedProjects: string[];
  level: number;
  xp: number;
  path: 'Beginner' | 'Intermediate' | 'Pro';
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'Concept' | 'Code' | 'Architecture';
  difficulty: 'Easy' | 'Hard';
}

// --- NEW TYPES ---

export interface BattleScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Normal' | 'Hard' | 'Extreme';
  timeLimit: number; // seconds
  context: string;
  options: { id: string; code: string; isCorrect: boolean; feedback: string }[];
}

export interface SkillStats {
  frontend: number;
  backend: number;
  aiTheory: number;
  devOps: number;
  ethics: number;
}

export interface PlaygroundPreset {
  name: string;
  systemPrompt: string;
  userPrompt: string;
}