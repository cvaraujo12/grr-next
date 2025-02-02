export type GoalStatus = 'not_started' | 'in_progress' | 'completed' | 'cancelled';
export type GoalPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface Goal {
  id: string;
  title: string;
  description: string;
  status: GoalStatus;
  period: GoalPeriod;
  targetDate: string;
  progress: number; // 0 to 100
  createdAt: string;
  updatedAt: string;
  milestones?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
} 