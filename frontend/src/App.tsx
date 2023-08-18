import {createBrowserRouter ,RouterProvider} from 'react-router-dom';
import LoginPage from './pages/Login';
import MainPage from './pages/MainPage';
import SignupPage from './pages/Signup';
function App() {

  const router = createBrowserRouter([
    {index: true, element: <LoginPage/>},
    {path: '/sign-up', element: <SignupPage/>},
    {path: '/home', element: <MainPage/>},
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default App
