import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ActionResult } from '@/lib/types';
import { CheckCircle2, XCircle, AlertTriangle, Cpu, Calendar, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusIcons: { [key: string]: React.ReactNode } = {
  Success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  Failed: <XCircle className="h-5 w-5 text-destructive" />,
  'Needs input': <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  Pending: <Cpu className="h-5 w-5 animate-pulse" />,
};

const toolIcons: { [key: string]: React.ReactNode } = {
  'Google Calendar': <Calendar className="h-4 w-4 text-muted-foreground" />,
  Gmail: <Mail className="h-4 w-4 text-muted-foreground" />,
  'Google Calendar (AI)': <Calendar className="h-4 w-4 text-accent" />,
  'Gmail (AI)': <Mail className="h-4 w-4 text-accent" />,
};

export function ActionResultCard({ result }: { result: ActionResult | null }) {
  if (!result) return null;

  const statusIcon = statusIcons[result.status] || statusIcons['Pending'];
  const toolIcon = Object.entries(toolIcons).find(([key]) => result.toolUsed.startsWith(key))?.[1] || <Cpu className="h-4 w-4 text-muted-foreground" />;

  return (
    <Card className={cn(
      "transition-all duration-300 ease-in-out",
      result.status === 'Success' && 'border-green-500/50',
      result.status === 'Failed' && 'border-destructive/50'
    )}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">Action Result</span>
          {statusIcon}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-sm mb-1">Status</h3>
          <p className="text-sm text-muted-foreground">{result.status}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1">Action Taken</h3>
          <p className="text-sm text-muted-foreground">{result.actionTaken}</p>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-1">Tool Used</h3>
          <div className="flex items-center gap-2">
            {toolIcon}
            <p className="text-sm text-muted-foreground">{result.toolUsed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
