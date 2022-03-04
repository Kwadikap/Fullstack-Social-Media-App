import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Homepage from './pages/homepage/Homepage'
import Login from './pages/login/Login'
import ProfilePage from './pages/profilePage/ProfilePage'
import Register from './pages/register/Register'
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messenger/Messenger';


function App() {

  const {user} = useContext(AuthContext);
  return (
      <>
        <Routes>
            <Route path='/' element={ user ? <Homepage /> : <Register /> } />
            <Route path='/login' element={ user ? <Navigate to='/' /> : <Login />} />
            <Route path='/register' element={ user ? <Navigate to='/' /> : <Register />} />
            <Route path='/messenger' element={ !user ? <Navigate to='/' /> : <Messenger />} />
            <Route path='/profile/:username' element={<ProfilePage />} />
        </Routes>
      </>
  );
}

export default App;
