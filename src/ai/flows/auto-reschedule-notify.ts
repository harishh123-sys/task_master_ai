'use server';

/**
 * @fileOverview Implements the auto-reschedule-notify flow.
 *
 * - autoRescheduleNotify - A function that handles the automatic rescheduling of meetings and notifying the user.
 * - AutoRescheduleNotifyInput - The input type for the autoRescheduleNotify function.
 * - AutoRescheduleNotifyOutput - The return type for the autoRescheduleNotify function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoRescheduleNotifyInputSchema = z.object({
  originalEventTitle: z.string().describe('The title of the original event.'),
  originalEventStartTime: z.string().describe('The start time of the original event (ISO format).'),
  newSuggestedStartTime: z.string().describe('The new suggested start time (ISO format).'),
  reasonForReschedule: z.string().describe('The reason why the event needs to be rescheduled.'),
});
export type AutoRescheduleNotifyInput = z.infer<typeof AutoRescheduleNotifyInputSchema>;

const AutoRescheduleNotifyOutputSchema = z.object({
  notificationMessage: z.string().describe('A clear and concise message informing the user about the rescheduled meeting.'),
});
export type AutoRescheduleNotifyOutput = z.infer<typeof AutoRescheduleNotifyOutputSchema>;

export async function autoRescheduleNotify(input: AutoRescheduleNotifyInput): Promise<AutoRescheduleNotifyOutput> {
  return autoRescheduleNotifyFlow(input);
}

const autoRescheduleNotifyPrompt = ai.definePrompt({
  name: 'autoRescheduleNotifyPrompt',
  input: {schema: AutoRescheduleNotifyInputSchema},
  output: {schema: AutoRescheduleNotifyOutputSchema},
  prompt: `The original meeting "{{originalEventTitle}}" which was scheduled for {{originalEventStartTime}} has been automatically rescheduled to {{newSuggestedStartTime}} due to {{reasonForReschedule}}.\n\nCompose a concise and clear message to inform the user about this change. Focus on clarity and avoiding confusion.`,
});

const autoRescheduleNotifyFlow = ai.defineFlow(
  {
    name: 'autoRescheduleNotifyFlow',
    inputSchema: AutoRescheduleNotifyInputSchema,
    outputSchema: AutoRescheduleNotifyOutputSchema,
  },
  async input => {
    const {output} = await autoRescheduleNotifyPrompt(input);
    return output!;
  }
);
