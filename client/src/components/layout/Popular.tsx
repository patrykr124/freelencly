import { Tooltip } from "../UI/tooltip";


export default function Popular() {
  return (
    <section className="wrapper py-20 space-y-16 color ">
      <h2 className="text-center">
        Create your project and share it with a freelancer
      </h2>
      <div className="flex gap-6 ">
        <div className="w-2/3">
          <img src="/img/task.png" width={900} height={900} />
        </div>
        <div className="w-1/3 space-y-6 mt-12">
          <p className="text-xl text-end ">"This is the first project management platform that's actually saved me money."</p>
          <div className="flex items-center justify-center"><Tooltip/></div>
      
        </div>
      </div>
    </section>
  );
}
