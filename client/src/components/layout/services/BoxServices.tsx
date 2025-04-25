import { BoxServicesProps } from "@/types/box_services_props";
import { Link } from "react-router-dom";

export default function BoxServices(props: BoxServicesProps) {
  return (
    <Link
      to={`/services/${props.category}/${props.id}`}
      key={`${props.id}`}
      className="min-w-[250px] relative h-[300px] rounded-xl overflow-hidden flex flex-col"
    >
      <div className="top">
        <img
          src={`http://localhost:3000/uploads/${props.img}`}
          className="w-full h-[180px]  object-cover object-center"
          alt="bg_img"
        />
      </div>
      <div className="bg-black/5 h-full p-2 space-y-2 justify-center flex flex-col">
        <div className="flex gap-2 items-center">
          <div className="avatar w-6 h-6 rounded-full bg-black/20"></div>
          <div className="flex gap-1">
            <p className="">By</p>
            <p className="font-semibold"> {props.postedBy.name}</p>
          </div>
        </div>
        <p className="">{props.title}</p>
        <p className="text-lg font-semibold absolute text-white top-[40%] bg-green-600 px-3 py-1.5 rounded-r-md left-0">
          from {props.packages[0].price} zł
        </p>
      </div>
    </Link>
  );
}
