export interface BoxServicesProps {
  id: string;
  category: string;
  img: string;
  title: string;
  description: string;
  packages: {
    price: number;
    type: string;
    description: string;
    revisions: number;
  }[];
  postedBy: { name: string; id: string, avatarUrl?: string};
  
  taskPerHours: { hourlyRate: number }[];
  name: string;
  hourlyRate: number;
  price: number;
}

export interface BoxServicesOne{
  id: string;
  category: string;
  img: string;
  title: string;
  description?: string;
  packages: {
    price: number;
    type: string;
    description: string;
    revisions: number;
  }[];
  postedBy: { name: string; id: string, avatarUrl?: string };
}

export interface Job {
  job: BoxServicesProps;
}

export interface User {
  id: string;
  name: string;
}

export interface Freelancer {
  hourlyRate: number;
  id: string;
  name: string;
  user: User;
}


export interface TaskInput{
  title: string;
  description: string;
  status: string;
  priority: string;
  createdById: string | undefined;
  assignedToId: string;
  dueDate: string;
  freelencerId: string;
  taskManagerOfferId: string | undefined;
};

export interface Task {
  id:string;
  title: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  createdById: string;
  assignedToId: string;
  description: string;
  dueDate: string;
  createdAt: string;
  freelencerId: string;
  taskManagerOfferId: string;
}