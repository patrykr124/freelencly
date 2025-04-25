import { Job } from "@/types/box_services_props";
import { Star } from "lucide-react";

export default function Avatar({ job }: Job) {
  return (
    <div className="flex jus-end items-center gap-4 bg-white h-[200px] shadow-xl rounded-lg p-4 -mt-40 z-10 w-2/3 ">
      <img className="rounded-full bg-black/20 w-20 h-20" />
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2">
          <p className="text-xl text-center">{job?.postedBy?.name}</p>
          <div className="w-1 h-4 "></div>
          
        </div>
        <div className="flex">
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
          <Star size={18} className="text-yellow-500" />
        </div>
        <p className="text-sm text-gray-500">4 orders completed this month</p>
      </div>
    </div>
  );
}
