import { BoxServicesOne } from "@/types/box_services_props";
import { Link } from "react-router-dom";

export default function BoxServices({id,category,img,title,packages,postedBy } : BoxServicesOne) {
  return (
    <Link
      to={`/services/${category}/${id}`}
      key={`${id}`}
      className="min-w-[250px] relative h-[300px] rounded-xl overflow-hidden flex flex-col"
    >
      <div className="top">
        <img
          src={`${import.meta.env.VITE_API_URL}/uploads/${img}`}
          className="w-full h-[180px]  object-cover object-center"
          alt="bg_img"
        />

      </div>
      <div className="bg-black/5 h-full p-2 space-y-2 justify-center flex flex-col">
        <div className="flex gap-2 items-center">
          <img src={`${import.meta.env.VITE_API_URL}/${postedBy.avatarUrl}`} className="w-6 h-6 rounded-full bg-black/20" alt="" />
          <div className="flex gap-1">
            <p className="">By</p>
            <p className="font-semibold"> {postedBy.name}</p>
          </div>
        </div>
        <p className="">{title}</p>
        <p className="text-lg font-semibold absolute text-white top-[40%] bg-green-600 px-3 py-1.5 rounded-r-md left-0">
          from {packages[0].price} zł
        </p>
      </div>
    </Link>
  );
}
