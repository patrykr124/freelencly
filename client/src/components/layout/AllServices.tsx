
import { servicesData } from "../../lib/Services";
import Box from "../UI/Box";

export default function AllServices() {
  return (
    <section className="wrapper pt-20 color">
      <div className="flex gap-6">

        {servicesData.map((item) => (
          <Box key={item.id} href={item.href} icon={item.icon} title={item.title} />
        ))}

      </div>
    </section>
  )
}