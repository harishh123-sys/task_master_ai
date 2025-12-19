import { config } from 'dotenv';
config();

import '@/ai/flows/auto-reschedule-notify.ts';
import '@/ai/flows/suggest-email-reminder.ts';
import '@/ai/flows/schedule-meeting.ts';
