'use client';

import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateId } from '@/utils/generateId';

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  createdAt: string;
  updatedAt: string;
  color?: string;
}

interface GoalsContextType {
  goals: Goal[];
  isLoading: boolean;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  getGoalById: (id: string) => Goal | undefined;
}

const GoalsContext = createContext<GoalsContextType | null>(null);

// Validar se um objeto é uma meta válida
const isValidGoal = (goal: unknown): goal is Goal => {
  if (typeof goal !== 'object' || goal === null) return false;
  const g = goal as Record<string, unknown>;
  
  return (
    typeof g.id === 'string' &&
    typeof g.title === 'string' &&
    typeof g.description === 'string' &&
    (g.deadline === undefined || typeof g.deadline === 'string') &&
    ['pending', 'in_progress', 'completed'].includes(g.status as string) &&
    ['low', 'medium', 'high'].includes(g.priority as string) &&
    typeof g.progress === 'number' &&
    typeof g.createdAt === 'string' &&
    typeof g.updatedAt === 'string' &&
    (g.color === undefined || typeof g.color === 'string')
  );
};

// Validar um array de metas
const validateGoals = (goals: unknown[]): Goal[] => {
  return goals.filter(isValidGoal);
};

export function GoalsProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useLocalStorage<Goal[]>('goals', []);
  const [isLoading, setIsLoading] = useState(true);

  // Validar as metas ao inicializar
  useEffect(() => {
    const validGoals = validateGoals(goals || []);
    if (validGoals.length !== goals.length) {
      setGoals(validGoals);
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [goals, setGoals]);

  const addGoal = useCallback((newGoal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const now = new Date().toISOString();
      const goal: Goal = {
        ...newGoal,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };

      if (isValidGoal(goal)) {
        setGoals((prevGoals) => [...(prevGoals || []), goal]);
      } else {
        console.warn('Attempted to add invalid goal:', goal);
      }
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  }, [setGoals]);

  const updateGoal = useCallback((id: string, updatedFields: Partial<Goal>) => {
    try {
      setGoals((prevGoals) =>
        (prevGoals || []).map((goal) =>
          goal.id === id
            ? {
                ...goal,
                ...updatedFields,
                updatedAt: new Date().toISOString(),
              }
            : goal
        )
      );
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  }, [setGoals]);

  const deleteGoal = useCallback((id: string) => {
    try {
      setGoals((prevGoals) => (prevGoals || []).filter((goal) => goal.id !== id));
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  }, [setGoals]);

  const getGoalById = useCallback(
    (id: string) => goals.find((goal) => goal.id === id),
    [goals]
  );

  const value = useMemo(
    () => ({
      goals,
      isLoading,
      addGoal,
      updateGoal,
      deleteGoal,
      getGoalById,
    }),
    [goals, isLoading, addGoal, updateGoal, deleteGoal, getGoalById]
  );

  return <GoalsContext.Provider value={value}>{children}</GoalsContext.Provider>;
}

export function useGoals() {
  const context = useContext(GoalsContext);
  if (!context) {
    throw new Error('useGoals must be used within a GoalsProvider');
  }
  return context;
}
