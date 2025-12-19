'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const createCalendarEvent = ai.defineTool(
  {
    name: 'createCalendarEvent',
    description: 'Create a new event in Google Calendar.',
    inputSchema: z.object({
      title: z.string().describe('The title of the event.'),
      startTime: z.string().datetime().describe('The start time of the event in ISO 8601 format.'),
      endTime: z.string().datetime().describe('The end time of the event in ISO 8601 format.'),
      participants: z.array(z.string().email()).optional().describe('A list of participant emails to invite.'),
    }),
    outputSchema: z.object({
      eventId: z.string().describe('The ID of the created event.'),
      eventUrl: z.string().url().describe('The URL to view the event in Google Calendar.'),
    }),
  },
  async (input) => {
    console.log('Simulating Google Calendar event creation with input:', input);
    // In a real application, you would use the Google Calendar API here.
    // This requires authentication (OAuth2) and making an API call.
    
    // For this example, we'll return a fake event ID and URL.
    const eventId = `evt_${Date.now()}`;
    const eventUrl = `https://calendar.google.com/event?action=VIEW&eid=${eventId}`;

    return {
      eventId,
      eventUrl,
    };
  }
);
