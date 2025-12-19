'use client';

import { useState } from 'react';
import { initialTasks } from '@/lib/data';
import type { Task, ActionResult } from '@/lib/types';
import { CommandForm } from '@/components/CommandForm';
import { ActionResultCard } from '@/components/ActionResultCard';
import { AutomationCard } from '@/components/AutomationCard';
import { TaskList } from '@/components/TaskList';
import { handleUserCommand, triggerAutoReschedule, triggerEmailReminder } from '@/app/actions';

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [mainActionResult, setMainActionResult] = useState<ActionResult | null>(null);
  const [automationResult, setAutomationResult] = useState<ActionResult | null>(null);
  
  const [isCommandLoading, setIsCommandLoading] = useState(false);
  const [isRescheduleLoading, setIsRescheduleLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const onCommandSubmit = async (command: string) => {
    setIsCommandLoading(true);
    setMainActionResult(null);
    setAutomationResult(null);
    const result = await handleUserCommand(command);
    setMainActionResult(result);
    setIsCommandLoading(false);
  };

  const onTriggerReschedule = async () => {
    setIsRescheduleLoading(true);
    setMainActionResult(null);
    setAutomationResult(null);
    const result = await triggerAutoReschedule();
    setAutomationResult(result);
    setIsRescheduleLoading(false);
  };

  const onTriggerEmail = async () => {
    setIsEmailLoading(true);
    setMainActionResult(null);
    setAutomationResult(null);
    const result = await triggerEmailReminder();
    setAutomationResult(result);
    setIsEmailLoading(false);
  };

  return (
    <div className="container max-w-screen-2xl flex-1 items-start gap-8 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Task Agent</h1>
          <p className="text-muted-foreground">
            Automate your reminders, emails, and scheduling with natural language.
          </p>
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <CommandForm onSubmit={onCommandSubmit} isLoading={isCommandLoading} />
        </div>
        <div className="space-y-8 lg:col-span-1">
          <AutomationCard 
            onTriggerReschedule={onTriggerReschedule} 
            isRescheduleLoading={isRescheduleLoading}
            onTriggerEmail={onTriggerEmail}
            isEmailLoading={isEmailLoading}
          />
        </div>
      </div>
      {(mainActionResult || automationResult) && 
        <div className="mt-8">
            <ActionResultCard result={mainActionResult || automationResult} />
        </div>
      }
      <div className="mt-8">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
