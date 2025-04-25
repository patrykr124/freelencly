import Button from "../UI/Buttons/Button";
import Check from "../UI/Check";

export default function About() {
    return (
        <section className="py-20 bg-gray-100 color ">
            <div className="grid grid-cols-2 gap-10 wrapper ">
                <div className="">
                    <img src="/img/about.png" />
                </div>
                <div className="flex flex-col items-center justify-center gap-20">
                    <h2>Top freelancers, ready in <span className="text-green-600">24 hours.</span></h2>
                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2"><Check /> Matched in 24 Hours</h4>
                            <p>Skip the endless scrolling. Send us your brief and get the perfect freelancer delivered within a day.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2"><Check /> Verified Talent Only</h4>
                            <p>We work exclusively with experienced freelancers, vetted through their portfolios and client reviews.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2"><Check /> Flexible & Scalable</h4>
                            <p>Whether you need one expert or an entire remote team — we scale with your project needs, on demand.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="flex items-center gap-2"><Check /> Time & Cost Efficient</h4>
                            <p>Save hours of recruitment and avoid costly mis-hires. We connect you with the right talent — fast and smart.</p>
                        </div>
                        <div className="w-full">
                            <Button color="bg-black text-white">Join</Button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}