export type Task = {
  id: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
};

export type ActionResult = {
  actionTaken: string;
  toolUsed: string;
  status: 'Success' | 'Pending' | 'Needs input' | 'Failed' | string;
};
