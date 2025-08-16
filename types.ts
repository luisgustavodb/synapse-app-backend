
import React from 'react';

export interface MoodData {
  day: string;
  value: number;
}

export interface Feeling {
  name: string;
  emoji: string;
}

export interface Insight {
  title: string;
  value: number;
  label: string;
  color: string;
}

export interface Article {
  id: string;
  type: 'ARTICLE' | 'TIP' | 'CURIOSITY';
  title:string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  imageUrl: string;
  content: string;
  tags?: string[];
}

export interface Step {
    type: 'exercise' | 'rest';
    name: string;
    details: string; // e.g., "3x 12 repetições" or "45 segundos"
}

export interface ActivityItem {
    id: string;
    category: 'workout' | 'meditation' | 'nutrition';
    title: string;
    description: string;
    duration: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    bgColor: string;
    textColor: string;
    imageUrl?: string;
    videoUrl?: string;
    audioUrl?: string;
    content: string;
    difficulty?: 'Iniciante' | 'Médio' | 'Difícil';
    goal?: 'Condicionamento' | 'Emagrecimento' | 'Hipertrofia';
    muscleGroup?: string;
    steps?: Step[];
}

export interface PodcastCategory {
  id: string;
  title: string;
  imageUrl: string;
  gradient: string;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  text: string;
  timestamp: string;
}

export interface PodcastItem {
    id: string;
    podcastCategoryId: string;
    category: 'podcast';
    title: string;
    creator: string;
    duration: string;
    description: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    imageUrl: string;
    audioUrl: string;
    content: string; // Show notes
    views: number;
    publishedAt: string;
    creatorAvatarUrl: string;
}

export interface ResourceItem {
    id: string;
    type: 'guide' | 'ebook';
    title: string;
    description: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    imageUrl: string;
    content: string;
}


export interface NavItem {
  path: string;
  label: string;
  Icon: React.FC<{ className?: string }>;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

export interface Professional {
    id: string;
    name: string;
    specialty: string;
    bio: string;
    avatarUrl: string;
    rating: number;
    availability: string;
    status: 'Online' | 'Offline';
    fee: number;
}

export interface User {
    name: string;
    avatarUrl: string;
    handle: string;
    bio: string;
    followers: number;
    following: number;
    email: string;
    dob?: string;
}

export interface FeedPost {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string; // emoji or image url
  };
  imageUrl?: string;
  videoUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  type?: 'post' | 'ad';
  isLikedByCurrentUser?: boolean;
}

export interface Notification {
  id: string;
  user: {
    name: string;
    avatar: string; // emoji or image url
  };
  type: 'like' | 'comment' | 'follow' | 'system';
  content: string;
  timestamp: string;
  isRead: boolean;
  postThumbnail?: string; // Optional image URL for the post related to the notification
}

export interface ChatConversation {
  id: string;
  user: {
    name: string;
    avatar: string; // emoji or image url
  };
  lastMessage: string;
  timestamp: string;
  isRead: boolean;
}


// Nutrition Types
export interface DailyNutrition {
    consumed: number;
    goal: number;
    burned: number;
}

export interface Macro {
    name: 'Carboidratos' | 'Proteína' | 'Gordura';
    consumed: number;
    goal: number;
    color: string;
}

export interface Meal {
    id: string;
    name: string;
    calories: number;
    goal: number;
    icon: string; // Emoji
}

export interface WaterDataPoint {
  day: string;
  liters: number;
}

export interface DailyWater {
    consumed: number;
    goal: number;
}

export interface CalorieDataPoint {
    day: string;
    calories: number;
}

// Progress Types
export interface ProgressChartData {
  week: string;
  workouts: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  currentProgress: number;
  target: number;
  unit: string;
}

export type AchievementCategory = 'Engajamento' | 'Saúde Física' | 'Saúde Mental' | 'Exploração';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: AchievementCategory;
}

export interface Story {
  id: string;
  imageUrl: string;
  user: {
      name: string;
      avatarUrl: string;
  };
  timestamp: string; // e.g., "4h"
}

export interface StoryHighlight {
  id: string;
  label: string;
  coverUrl: string;
  stories: Story[];
}

export interface RelatedUser {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    followingStatus: 'following' | 'not_following';
}

export interface ClassParticipant {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface GroupClass {
  id: string;
  title: string;
  time: string; // e.g., "HOJE, 17H"
  imageUrl: string;
  region: string; // e.g., "SP", "RJ"
  period: 'Manhã' | 'Tarde' | 'Noite';
  ageRange: '18-25' | '26-40' | 'Outros';
  description: string;
  duration: string; // e.g., "60 min"
  videoUrl?: string;
  location: {
    name: string;
    address: string;
    mapUrl: string; // URL for an embedded map
  };
  participants: ClassParticipant[];
}
