export interface BoxServicesProps {
  id: string;
  category: string;
  img: string;
  title: string;
  description: string;
  packages: { price: number, type: string, description: string, revisions: number }[];
  postedBy: { name: string };
}

export interface Job{
  job: BoxServicesProps;
}