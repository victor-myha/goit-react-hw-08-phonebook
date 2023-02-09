import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Error404 } from './Error404/Error404'
import { fetchCurrentUser } from 'redux/thunks'
import Navigation from './Navigation/Navigation'
import ProtectedRoutes from '../common/Routes/ProtectedRoutes'
import Contacts from './Contacts/Contacts'
import Login from './Login/Login'
import Register from './Register/Register'
import Home from './Home/Home'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path={'/'} element={<ProtectedRoutes element={<Home />} />} />
        <Route path={'/login'} element={<ProtectedRoutes element={<Login />} />} />
        <Route path={'/register'} element={<ProtectedRoutes element={<Register />} />} />
        <Route path={'/contacts'} element={<ProtectedRoutes isSecured element={<Contacts />} />} />
        <Route path={'*'} element={<Error404 />} />
      </Routes>
    </div>
  )
}
