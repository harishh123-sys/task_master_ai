import type { Task } from '@/lib/types';

// Use a fixed date for "now" to ensure consistent values between server and client
const now = new Date('2024-07-26T10:00:00.000Z');

const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
tomorrow.setHours(14, 0, 0, 0);

const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);
yesterday.setHours(9, 30, 0, 0);

const twoDaysAgo = new Date(now);
twoDaysAgo.setDate(now.getDate() - 2);
twoDaysAgo.setHours(16, 0, 0, 0);

const nextWeek = new Date(now);
nextWeek.setDate(now.getDate() + 7);
nextWeek.setHours(11, 0, 0, 0);

export const initialTasks: Task[] = [
  { id: '1', description: 'Submit Q3 financial report', dueDate: tomorrow, status: 'pending', priority: 'high' },
  { id: '2', description: 'Prepare slides for project Alpha presentation', dueDate: new Date(now.getTime() + 2 * 60 * 60 * 1000), status: 'pending', priority: 'medium' },
  { id: '3', description: 'Schedule team offsite for September', dueDate: nextWeek, status: 'pending', priority: 'low' },
  { id: '4', description: 'Review and approve marketing campaign brief', dueDate: twoDaysAgo, status: 'completed', priority: 'medium' },
  { id: '5', description: 'Onboard new hire, Sarah', dueDate: yesterday, status: 'overdue', priority: 'high' },
];
