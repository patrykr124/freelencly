import { Link, useLocation, useNavigate} from "react-router-dom";
import useAuth from '../store/auth';
import closePopup from "../store/closePopup";
import Button from './UI/Buttons/Button';
import ButtonPopup from "./UI/Buttons/ButtonPopup";

export default function NavBar() {
  const { isAuth } = useAuth()
  const logOut = useAuth((state) => state.logout)
  const { togglePopup } = closePopup()
  const {pathname} = useLocation()
 
  let css = ''
  if(pathname === '/project') {
    css = ' p-2 '
  } else {
    css = 'wrapper'
  }
  
  const navigate = useNavigate()

  function logout() {
    logOut()
    togglePopup(false)
    navigate('/')
  }


  return (
    <header className={` bg-black  transition-all duration-150 fixed z-[99999] top-0 w-full h-16 py-0 flex items-center justify-center`}>
      <div className={`${css} w-full flex justify-between`}>
        <div className="flex items-center justify-center">
          <a href="/" className="text-4xl text-white transition-colors duration-300 ">Freelencly</a>
        </div>
        <div className=" flex gap-4">
          <Link className="text-sm link bg-white" to="/create" >Create a offer</Link><Button onClick={() => navigate('/project')} color='bg-white' >Create your project</Button>
          {isAuth ? <> <Button onClick={() => navigate('/setting')} color='bg-white' >Setting</Button><ButtonPopup onClick={logout} color="bg-white text-black text-sm">Logout</ButtonPopup>
          </>
            :
            <ButtonPopup onClick={() => togglePopup(true)} color="bg-black text-white text-sm">Join</ButtonPopup>}
        </div>
      </div>
    </header>
  )
}