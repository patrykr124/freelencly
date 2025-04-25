export default function ServicesBox() {
  return (
    <div className="w-[280px]  ">
      <img src="/img/mobileapp.jpg" className="rounded-xl" />
      <div className="h-[200px] justify-center shadow-md rounded-xl px-2 relative z-20 gap-1 flex flex-col ">
        <div className=" flex gap-4">
          <div className="bg-dark w-fit -mt-12 ml-0  rounded-full flex flex-col text-white items-center py-2.5 px-1.5 h-[90px] justify-between ">
            <p className="p-2 w-8 h-8 flex items-center justify-center bg-green-600 rounded-full mb-2">24</p>
            <div className="flex flex-col items-center">
              <p className="text-xs leading-2">Active</p>
              <p className="text-xs">now</p>
            </div>
          </div>
          <div className="space-y-1 flex flex-col justify-center">
            <h4 className="font-medium text-xl">App mobile</h4>
            <h5 className="text-md font-medium">repellendus consectetur.</h5>
          </div>

        </div>
        <div className="px-2 flex items-center justify-center">
          <p className="text-sm leading-snug">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores sed eum error optio, tempore quod esse </p>
        </div>
      </div>

    </div>
  )
}
