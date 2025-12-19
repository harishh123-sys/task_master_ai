'use server';

import { autoRescheduleNotify, type AutoRescheduleNotifyInput } from '@/ai/flows/auto-reschedule-notify';
import { suggestAndSendEmailReminder, type SuggestEmailReminderInput } from '@/ai/flows/suggest-email-reminder';
import type { ActionResult } from '@/lib/types';

export async function handleUserCommand(command: string): Promise<ActionResult> {
  await new Promise(resolve => setTimeout(resolve, 1000)); 

  if (!command) {
     return {
      actionTaken: 'Command is empty. Please enter a command.',
      toolUsed: 'N/A',
      status: 'Failed',
    };
  }

  if (command.toLowerCase().includes('report')) {
    return {
      actionTaken: 'Reminder for "Submit the report" created for tomorrow at 5 PM.',
      toolUsed: 'Google Calendar',
      status: 'Success',
    };
  }
  if (command.toLowerCase().includes('meeting with rahul')) {
    return {
      actionTaken: 'Meeting with "Rahul" scheduled for Monday at 10 AM.',
      toolUsed: 'Google Calendar',
      status: 'Success',
    };
  }

  return {
    actionTaken: 'Could not understand command. Try "submit report" or "schedule meeting with rahul".',
    toolUsed: 'N/A',
    status: 'Failed',
  };
}

export async function triggerAutoReschedule(): Promise<ActionResult> {
  const input: AutoRescheduleNotifyInput = {
    originalEventTitle: 'Project Sync',
    originalEventStartTime: new Date().toISOString(),
    newSuggestedStartTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    reasonForReschedule: 'a conflict with a high-priority meeting',
  };

  try {
    const result = await autoRescheduleNotify(input);
    return {
      actionTaken: result.notificationMessage,
      toolUsed: 'Google Calendar (AI)',
      status: 'Success',
    };
  } catch (error) {
    console.error(error);
    return {
      actionTaken: 'Failed to generate reschedule notification.',
      toolUsed: 'Google Calendar (AI)',
      status: 'Failed',
    };
  }
}

export async function triggerEmailReminder(): Promise<ActionResult> {
  const input: SuggestEmailReminderInput = {
    taskDescription: 'Submit Q3 financial report',
    deadline: 'today at 5 PM',
    recipientEmail: 'manager@example.com',
  };
  
  try {
    const result = await suggestAndSendEmailReminder(input);
    return {
      actionTaken: `Action: ${result.actionTaken}. Details: Email draft with subject "${result.emailSubject}" prepared.`,
      toolUsed: `${result.toolUsed} (AI)`,
      status: result.status as 'Success',
    };
  } catch (error) {
    console.error(error);
    return {
      actionTaken: 'Failed to generate email reminder.',
      toolUsed: 'Gmail (AI)',
      status: 'Failed',
    };
  }
}
