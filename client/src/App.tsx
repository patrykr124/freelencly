import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Popup from "./components/Popup";
import Create from "./pages/Create";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import Setting from "./pages/Setting";
import useAuth from "./store/auth";
import ServicesPageDetail from "./pages/ServicesPageDetail";
import Project from "./pages/Project";
import Edit from "./pages/Edit";
import ServicesSearchPage from "./pages/ServicesSearchPage";

function App() {
  const { init } = useAuth();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/setting" element={<Setting />} />

        <Route path="/project/:id" element={<Project />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/services/all" element={<ServicesSearchPage />} />
        <Route path="/services/:category" element={<ServicesPage />} />
        <Route
          path="/services/:category/:id"
          element={<ServicesPageDetail />}
        />
      </Routes>
      <Popup />
    </>
  );
}

export default App;
