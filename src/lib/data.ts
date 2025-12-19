import type { Task } from '@/lib/types';

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);
const twoDaysAgo = new Date(now);
twoDaysAgo.setDate(now.getDate() - 2);
const nextWeek = new Date(now);
nextWeek.setDate(now.getDate() + 7);

export const initialTasks: Task[] = [
  { id: '1', description: 'Submit Q3 financial report', dueDate: tomorrow, status: 'pending', priority: 'high' },
  { id: '2', description: 'Prepare slides for project Alpha presentation', dueDate: new Date(now.getTime() + 2 * 60 * 60 * 1000), status: 'pending', priority: 'medium' },
  { id: '3', description: 'Schedule team offsite for September', dueDate: nextWeek, status: 'pending', priority: 'low' },
  { id: '4', description: 'Review and approve marketing campaign brief', dueDate: twoDaysAgo, status: 'completed', priority: 'medium' },
  { id: '5', description: 'Onboard new hire, Sarah', dueDate: yesterday, status: 'overdue', priority: 'high' },
];
