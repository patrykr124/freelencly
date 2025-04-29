export interface BoxServicesProps {
  id: string;
  category: string;
  img: string;
  title: string;
  description: string;
  packages: { price: number, type: string, description: string, revisions: number }[];
  postedBy: { name: string, id: string };
  taskPerHours: { hourlyRate: number }[];
  name: string;
  hourlyRate: number;
  price: number;
}

export interface Job{
  job: BoxServicesProps;
}