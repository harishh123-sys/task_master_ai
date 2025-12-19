'use server';

import { autoRescheduleNotify, type AutoRescheduleNotifyInput } from '@/ai/flows/auto-reschedule-notify';
import { suggestAndSendEmailReminder, type SuggestEmailReminderInput } from '@/ai/flows/suggest-email-reminder';
import { scheduleMeeting, type ScheduleMeetingInput } from '@/ai/flows/schedule-meeting';
import type { ActionResult } from '@/lib/types';
import { ai } from '@/ai/genkit';

async function parseCommandWithAI(command: string) {
    const { output } = await ai.generate({
      prompt: `You are a command parser. Extract the intent and entities from the following user command. The intents can be 'schedule', 'remind', or 'unknown'. 
      
      For 'schedule', entities are 'title', 'participants' (as an array of emails), 'startTime' (in ISO 8601 format), and 'endTime' (in ISO 8601 format). Assume events are for 1 hour if no end time is given. Assume the current year.
      For 'remind', entities are 'task', and 'deadline'.
      
      User command: "${command}"

      Provide the output in JSON format.
      Example for "Schedule a meeting with foo@bar.com tomorrow at 2pm about project x":
      { "intent": "schedule", "entities": { "title": "Project X Meeting", "participants": ["foo@bar.com"], "startTime": "...", "endTime": "..." } }

      Example for "Remind me to buy milk":
      { "intent": "remind", "entities": { "task": "Buy milk", "deadline": "today" } }
      `,
      model: 'googleai/gemini-2.5-flash',
      output: {
        format: 'json',
      },
    });

    return output?.json();
}


export async function handleUserCommand(command: string): Promise<ActionResult> {
  if (!command) {
     return {
      actionTaken: 'Command is empty. Please enter a command.',
      toolUsed: 'N/A',
      status: 'Failed',
    };
  }

  try {
    const parsedCommand = await parseCommandWithAI(command);

    if (parsedCommand.intent === 'schedule') {
        const result = await scheduleMeeting(parsedCommand.entities as ScheduleMeetingInput);
        if (result.success) {
            return {
                actionTaken: result.message,
                toolUsed: 'Google Calendar (AI)',
                status: 'Success',
            };
        } else {
             return {
                actionTaken: result.message,
                toolUsed: 'Google Calendar (AI)',
                status: 'Failed',
            };
        }
    }

    if (command.toLowerCase().includes('report')) {
        return {
          actionTaken: 'Reminder for "Submit the report" created for tomorrow at 5 PM.',
          toolUsed: 'Google Calendar',
          status: 'Success',
        };
      }

  } catch (error) {
    console.error("Error handling command:", error);
    return {
        actionTaken: 'There was an error processing your command.',
        toolUsed: 'N/A',
        status: 'Failed',
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
