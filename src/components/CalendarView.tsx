'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import type { Task } from '@/lib/types';
import { isSameDay, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';

const priorityStyles = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-500/50',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-500/50',
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-500/50',
};

const statusIcons = {
    pending: <Clock className="h-3 w-3" />,
    completed: <Check className="h-3 w-3" />,
    overdue: <CalendarIcon className="h-3 w-3" />,
};

export function CalendarView({ tasks }: { tasks: Task[] }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const tasksForSelectedDay = React.useMemo(() => {
    return date ? tasks.filter((task) => isSameDay(task.dueDate, date)) : [];
  }, [date, tasks]);

  const eventDays = React.useMemo(() => {
    return tasks.map((task) => task.dueDate);
  }, [tasks]);

  const modifiers = {
    event: eventDays,
  };

  const modifiersStyles = {
    event: {
      border: '2px solid hsl(var(--primary))',
      borderRadius: 'var(--radius)',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          <span>My Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </div>
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">
                Tasks for {date ? format(date, 'PPP') : 'N/A'}
            </h3>
            {tasksForSelectedDay.length > 0 ? (
                <ul className="space-y-3">
                {tasksForSelectedDay.map((task) => (
                    <li key={task.id} className="p-3 bg-card-foreground/5 rounded-lg">
                    <div className="flex items-start justify-between">
                        <p className="font-medium">{task.description}</p>
                        <Badge variant="outline" className={cn("capitalize text-xs", priorityStyles[task.priority])}>
                            {task.priority}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        {statusIcons[task.status]}
                        <span className="capitalize">{task.status}</span>
                        <span>&middot;</span>
                        <span>{format(task.dueDate, 'p')}</span>
                    </div>
                    </li>
                ))}
                </ul>
            ) : (
                <p className="text-muted-foreground">No tasks for this day.</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
