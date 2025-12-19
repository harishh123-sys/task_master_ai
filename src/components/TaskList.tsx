import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow } from 'date-fns';
import { Calendar, Check, Clock } from 'lucide-react';

const priorityStyles = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
};

const statusStyles = {
  pending: 'border-blue-500/50 text-blue-500',
  completed: 'border-green-500/50 text-green-500',
  overdue: 'border-red-500/50 text-red-500',
};

const statusIcons = {
  pending: <Clock className="h-3 w-3" />,
  completed: <Check className="h-3 w-3" />,
  overdue: <Calendar className="h-3 w-3" />,
};


export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.description}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{format(task.dueDate, 'MMM d, yyyy')}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(task.dueDate, { addSuffix: true })}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", priorityStyles[task.priority])}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize flex items-center gap-1", statusStyles[task.status])}>
                    {statusIcons[task.status]}
                    {task.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
