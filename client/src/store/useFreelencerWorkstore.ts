import { create } from "zustand";

type Freelancer = {
    id: string;
    name: string;
    hourlyRate: number;
  };
  
  type WorkspaceStore = {
    freelancers: Freelancer[];
    addFreelancer: (freelancer: Freelancer) => void;
  };

const useFreelencerWorkstore = create<WorkspaceStore>((set) => ({
  freelancers: [],
  addFreelancer: (freelancer) =>
    set((state) => {
      // Unikalność po id
      if (state.freelancers.some((f) => f.id === freelancer.id)) return state;
      return { freelancers: [...state.freelancers, freelancer] };
    }),
}));

export default useFreelencerWorkstore;
