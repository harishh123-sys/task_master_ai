'use server';

/**
 * @fileOverview Flow for suggesting and sending email reminders for upcoming deadlines.
 *
 * - suggestAndSendEmailReminder - A function that handles the suggestion and sending of email reminders.
 * - SuggestEmailReminderInput - The input type for the suggestAndSendEmailReminder function.
 * - SuggestEmailReminderOutput - The return type for the suggestAndSendEmailReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEmailReminderInputSchema = z.object({
  taskDescription: z.string().describe('The description of the task.'),
  deadline: z.string().describe('The deadline for the task (e.g., "tomorrow at 5 PM").'),
  recipientEmail: z.string().email().describe('The email address of the recipient.'),
});

export type SuggestEmailReminderInput = z.infer<typeof SuggestEmailReminderInputSchema>;

const SuggestEmailReminderOutputSchema = z.object({
  emailSubject: z.string().describe('The subject of the email reminder.'),
  emailBody: z.string().describe('The body of the email reminder.'),
  actionTaken: z.string().describe('Report on action taken, i.e. "Reminder email sent".'),
  toolUsed: z.string().describe('Tool used for the action, i.e. "Gmail".'),
  status: z.string().describe('Status of the action, i.e. "Success".'),
});

export type SuggestEmailReminderOutput = z.infer<typeof SuggestEmailReminderOutputSchema>;

export async function suggestAndSendEmailReminder(input: SuggestEmailReminderInput): Promise<SuggestEmailReminderOutput> {
  return suggestAndSendEmailReminderFlow(input);
}

const suggestEmailReminderPrompt = ai.definePrompt({
  name: 'suggestEmailReminderPrompt',
  input: {schema: SuggestEmailReminderInputSchema},
  output: {schema: SuggestEmailReminderOutputSchema},
  prompt: `You are an AI assistant designed to automate email reminders for users. 

  Based on the task description, deadline, and recipient email, generate an email subject and body to remind the recipient of the upcoming deadline.
  Ensure the email is short, clear, and action-oriented.

  Task Description: {{{taskDescription}}}
  Deadline: {{{deadline}}}
  Recipient Email: {{{recipientEmail}}}

  Output should contain the emailSubject and emailBody, and actionTaken, toolUsed and status.
  actionTaken should be "Reminder email sent".
  toolUsed should be "Gmail".
  status should be "Success".`,
});

const suggestAndSendEmailReminderFlow = ai.defineFlow(
  {
    name: 'suggestAndSendEmailReminderFlow',
    inputSchema: SuggestEmailReminderInputSchema,
    outputSchema: SuggestEmailReminderOutputSchema,
  },
  async input => {
    const {output} = await suggestEmailReminderPrompt(input);
    // Here, you would integrate with Gmail to actually send the email.
    // This is a placeholder for the email sending functionality.

    // For now, we just return the generated email content.
    return output!;
  }
);
