import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Popup from "./components/Popup"
import Create from "./pages/Create"
import Home from "./pages/Home"
import ServicesPage from "./pages/ServicesPage"
import Setting from "./pages/Setting"
import useAuth from "./store/auth"
import ServicesPageDetail from "./pages/ServicesPageDetail"
import Project from "./pages/Project"

function App() {
  const { init } = useAuth()

  useEffect(() => {
    init()
  }, [init])

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/project" element={<Project />} />
        <Route path="/services/:category" element={<ServicesPage />} />
        <Route path="/services/:category/:id" element={<ServicesPageDetail />} />
      </Routes>
      <Popup />
    </>
  )
}

export default App
