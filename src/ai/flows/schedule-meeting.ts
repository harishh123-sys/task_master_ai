'use server';

/**
 * @fileOverview A flow for scheduling meetings in Google Calendar.
 *
 * - scheduleMeeting - A function that handles scheduling a meeting.
 * - ScheduleMeetingInput - The input type for the scheduleMeeting function.
 * - ScheduleMeetingOutput - The return type for the scheduleMeeting function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { createCalendarEvent } from '@/ai/tools/google-calendar';

const ScheduleMeetingInputSchema = z.object({
  title: z.string().describe('The title of the meeting.'),
  participants: z.array(z.string()).describe('A list of participant emails.'),
  startTime: z.string().describe('The start time of the meeting in ISO format.'),
  endTime: z.string().describe('The end time of the meeting in ISO format.'),
});
export type ScheduleMeetingInput = z.infer<typeof ScheduleMeetingInputSchema>;

const ScheduleMeetingOutputSchema = z.object({
  success: z.boolean().describe('Whether the meeting was successfully scheduled.'),
  message: z.string().describe('A message confirming the action.'),
});
export type ScheduleMeetingOutput = z.infer<typeof ScheduleMeetingOutputSchema>;

export async function scheduleMeeting(input: ScheduleMeetingInput): Promise<ScheduleMeetingOutput> {
  return scheduleMeetingFlow(input);
}

const scheduleMeetingFlow = ai.defineFlow(
  {
    name: 'scheduleMeetingFlow',
    inputSchema: ScheduleMeetingInputSchema,
    outputSchema: ScheduleMeetingOutputSchema,
    tools: [createCalendarEvent],
  },
  async (input) => {
    const schedulingResult = await ai.generate({
      prompt: `Schedule the following meeting: ${input.title} with ${input.participants.join(', ')} from ${input.startTime} to ${input.endTime}`,
      tools: [createCalendarEvent],
      model: 'googleai/gemini-2.5-flash',
    });

    const toolRequest = schedulingResult.toolRequest();
    if (toolRequest) {
      const toolResponse = await toolRequest.run();
      const finalResponse = await ai.generate({
        prompt: `The meeting has been scheduled. The response from the tool is: ${toolResponse}. Please confirm to the user.`,
        model: 'googleai/gemini-2.5-flash',
      });
      return {
        success: true,
        message: finalResponse.text(),
      };
    }
    
    return {
        success: false,
        message: "I couldn't schedule the meeting. I might need more information.",
    };
  }
);
