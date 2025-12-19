'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Send } from 'lucide-react';

const formSchema = z.object({
  command: z.string().min(1, 'Command cannot be empty.'),
});

type CommandFormProps = {
  onSubmit: (command: string) => Promise<void>;
  isLoading: boolean;
};

export function CommandForm({ onSubmit, isLoading }: CommandFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      command: '',
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values.command);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>What needs to be done?</CardTitle>
        <CardDescription>
          Enter a command like "Remind me to submit the report tomorrow at 5 PM" or "Schedule a meeting with Rahul on Monday".
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="command"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Schedule a meeting with Rahul..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Execute
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
