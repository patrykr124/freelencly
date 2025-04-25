import { LineCharts } from "../UI/LineCharts";

export default function Progress() {
  return (
    <section className="py-20">
        <div className="wrapper flex gap-12">
            <div className="w-1/2">
                <LineCharts/>
            </div>
            <div className="w-1/2 space-y-4">
                <h2>Grow your business</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis voluptates nobis vero modi hic enim? A quas laudantium et excepturi delectus minima quaerat debitis recusandae perspiciatis? Odit asperiores excepturi cum?</p>
                <img className="w-[550px] h-auto object-cover" src="/img/grow.webp"/>
            </div>
        </div>
    </section>
  )
}