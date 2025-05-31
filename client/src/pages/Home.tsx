import Progress from "../components/layout/Progress";
import About from "../components/layout/About";
import AllServices from "../components/layout/AllServices";
import Header from "../components/layout/Header";
import Popular from "../components/layout/Popular";
import Services from "../components/layout/Services";

export default function Home() {
  return (
    <div className="">
      <Header />
      <AllServices />
      <Services />
      <hr />
      <About />
      <hr />
      <Popular />
      <hr />
      <Progress />
    </div>
  );
}
