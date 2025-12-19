'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Zap, Mail, CalendarClock } from 'lucide-react';

type AutomationCardProps = {
  onTriggerReschedule: () => Promise<void>;
  isRescheduleLoading: boolean;
  onTriggerEmail: () => Promise<void>;
  isEmailLoading: boolean;
};

export function AutomationCard({
  onTriggerReschedule,
  isRescheduleLoading,
  onTriggerEmail,
  isEmailLoading,
}: AutomationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-accent" />
          <span>Automations</span>
        </CardTitle>
        <CardDescription>
          Trigger predefined AI-powered automations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg">
          <div>
            <h3 className="font-semibold">Auto-Reschedule</h3>
            <p className="text-sm text-muted-foreground">Simulate a meeting conflict.</p>
          </div>
          <Button onClick={onTriggerReschedule} disabled={isRescheduleLoading} variant="outline" size="sm">
            {isRescheduleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CalendarClock className="mr-2 h-4 w-4" />
            )}
            Trigger
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg">
          <div>
            <h3 className="font-semibold">Email Reminder</h3>
            <p className="text-sm text-muted-foreground">Generate a draft follow-up.</p>
          </div>
          <Button onClick={onTriggerEmail} disabled={isEmailLoading} variant="outline" size="sm">
            {isEmailLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Trigger
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
