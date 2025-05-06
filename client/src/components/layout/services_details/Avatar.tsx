import useAuth from "../../../store/auth";
import { Job } from "@/types/box_services_props";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Avatar({ job }: Job) {
  const { user } = useAuth();
  const ownerJob = user && user.id === job?.postedBy.id;
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/${job?.id}`);
  };
  return (
    <div className="flex jus-end items-start gap-4  h-[200px] -mt-40 z-10 ">
      <div className="w-2/3 flex gap-4 bg-white rounded shadow-xl px-4 py-12">
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
      <div className="fixed bottom-0 right-0 bg-white h-12 py-7 shadow-md border-[1px] z-[9999] w-screen flex items-center justify-center">
        {ownerJob && (
          <div className="flex wrapper justify-end">
            <button
              onClick={handleEdit}
              className="bg-green-600 text-white py-2  px-4 rounded"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
