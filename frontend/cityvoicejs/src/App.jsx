import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/home'
import Signup from './pages/signup'
import Login from './pages/login'
import Profile from './pages/profile'
import AuthProtection from './authProtection'
import Following from './pages/following'
import GlobalFeed from './pages/globalFeed'
import LocalFeed from './pages/localFeed'
import FullPost from './pages/fullPost'

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path='signup' element={<Signup />} />
				<Route path='login' element={<Login />} />
				<Route path='profile/:username' element={<Profile />} />
				<Route path='post/:postid' element={<FullPost /> } />
				<Route path='/following' element={<Following />} />
				<Route path='/globalFeed' element={<GlobalFeed />} />
				<Route path='/' element={<LocalFeed />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App